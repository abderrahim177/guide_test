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
    public function addToBasket(Request $request)
    {
        // 1. Validation d l-données lli jayin min React
        $request->validate([
            'equipment_id' => 'required|exists:equipment,id',
            'guide_id'     => 'required|exists:users,id',
        ]);

        $equipment_id = $request->equipment_id;
        $guide_id     = $request->guide_id;
        $user_id      = Auth::id(); 

        // T-akkat blli l-user connecté (Déjà Sanctuum ki-gère hadi, walakin ziadat ta'kid)
        if (!$user_id) {
            return response()->json([
                'message' => 'Kindly log in first before checking out.'
            ], 401);
        }

        // 2. Najibo l-equipment o n-tal3o price_per_day min l-pivot table
        $equipment = Equipment::findOrFail($equipment_id);
        $currentGuide = $equipment->guides()->where('user_id', $guide_id)->first();
        
        $price = $currentGuide ? $currentGuide->pivot->price_per_day : 0;

        // 3. N-qllbo ʿla order 'pending' awla n-kriyyo waḥda jdida
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

        // 4. N-choufo واش l-item déjà f l-panier
        $orderItem = OrderItem::where('order_id', $order->id)
            ->where('equipment_id', $equipment_id)
            ->first();

        if ($orderItem) {
            $orderItem->increment('quantity');
        } else {
            OrderItem::create([
                'order_id'      => $order->id,
                'equipment_id'  => $equipment_id,
                'quantity'      => 1,
                'price_per_day' => $price 
            ]);
        }

        // 5. N-calculiw l-total jdid
        $total = OrderItem::where('order_id', $order->id)
            ->select(DB::raw('SUM(price_per_day * quantity) as total'))
            ->value('total');

        $order->update(['total_price' => $total ?? 0]);

        // 6. Return JSON response l React
        return response()->json([
            'message' => 'Material added to your basket successfully!',
            'order'   => $order->load('items.equipment') // Kat-rje' l-order b l-items dyalha
        ], 200);
    }
}