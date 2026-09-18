<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GuideEquipment;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MaterialsController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'guide_id' => 'required|exists:users,id',
            'total_price' => 'required|numeric',
            'pickup_date' => 'nullable|date',
            'return_date' => 'nullable|date',
            'items' => 'required|array|min:1',
            'items.*.equipment_id' => 'required',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price_per_day' => 'required|numeric',
        ]);
        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id' => Auth::id(),
                'guide_id' => $request->guide_id,
                'total_price' => $request->total_price,
                'status' => 'pending',
                'pickup_date' => $request->pickup_date,
                'return_date' => $request->return_date,
            ]);

            $orderItems = [];
            foreach ($request->items as $item) {
                $orderItems[] = OrderItem::create([
                    'order_id' => $order->id,
                    'equipment_id' => $item['equipment_id'],
                    'quantity' => $item['quantity'],
                    'price_per_day' => $item['price_per_day'],
                ]);
            }
            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'Order created successfully!',
                'order' => $order,
                'order_items' => $orderItems,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create order',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getmaterials(Request $request)
    {
        $Equipments = GuideEquipment::with(['equipment', 'guide'])->get();
        return response()->json($Equipments, 200);
    }
}
