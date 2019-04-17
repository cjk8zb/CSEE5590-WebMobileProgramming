package edu.umkc.cjk8zb.mypizza;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class ToppingsAdapter extends RecyclerView.Adapter<ToppingsAdapter.ViewHolder> {
    private final List<Order.Topping> mToppings;

    public ToppingsAdapter(List<Order.Topping> toppings) {
        mToppings = toppings;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull final ViewGroup parent, final int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.topping_view, parent, false);
        return new ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, final int position) {
        Order.Topping topping = mToppings.get(position);
        holder.nameTextView.setText(topping.getResId());
        holder.priceTextView.setText(Order.formatPrice(topping.getPrice(), holder.priceTextView.getContext()));
    }

    @Override
    public int getItemCount() {
        return mToppings.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        final TextView nameTextView;
        final TextView priceTextView;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            nameTextView = itemView.findViewById(R.id.text_name);
            priceTextView = itemView.findViewById(R.id.text_price);
        }
    }
}
