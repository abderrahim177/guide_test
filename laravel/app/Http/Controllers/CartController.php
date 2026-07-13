<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\DB;   

class CartController extends Controller
{
    public function addToBasket($equipment_id, $guide_id)
    {
        $user_id = Auth::id(); 

        if (!$user_id) {
            return redirect()->back()->with('error', 'Kindly log in first before checking out.');
        }

        // 1. كنجيبو الماتريال باش نعرفو الثمن ديالو من الـ pivot
        $equipment = Equipment::findOrFail($equipment_id);
        $currentGuide = $equipment->guides()->where('user_id', $guide_id)->first();
        
        $price = $currentGuide ? $currentGuide->pivot->price_per_day : 0;

        // 2. كنقلبو على سلة مفتوحة أو نكرييو وحدة جديدة
        $order = Order::firstOrCreate(
            [
                'user_id' => $user_id,
                'status'  => 'pending' 
            ],
            [
                'total_price' => 0, 
                'guide_id'    => $guide_id 
            ]
        );

        // 3. كنشوفو واش الماتريال ديجا كاين ف السلة
        $orderItem = OrderItem::where('order_id', $order->id)
            ->where('equipment_id', $equipment_id)
            ->first();

        if ($orderItem) {
            $orderItem->increment('quantity');
        } else {
            // 👈 التعديل هنا: عمرنا الكولون الحقيقي price_per_day اللي كاين ف الداتابيز ديالك
            OrderItem::create([
                'order_id'      => $order->id,
                'equipment_id'  => $equipment_id,
                'quantity'      => 1,
                'price_per_day' => $price 
            ]);
        }

        // 4. كنحدثو الثمن الإجمالي باستعمال الكولون الجديد price_per_day
        $total = OrderItem::where('order_id', $order->id)
            ->select(DB::raw('SUM(price_per_day * quantity) as total'))
            ->value('total');

        $order->update(['total_price' => $total ?? 0]);

        return redirect()->back()->with('success', 'Material added to your basket successfully!');
    }
}