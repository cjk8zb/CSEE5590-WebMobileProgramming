package edu.umkc.cjk8zb.mypizza;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class SummaryActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_summary);

        Intent intent = getIntent();
        final Order order = (Order) intent.getSerializableExtra("order");
        final RecyclerView recyclerView = findViewById(R.id.list);
        recyclerView.setHasFixedSize(true);

        final RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);

        final RecyclerView.Adapter adapter = new ToppingsAdapter(order.getToppings());
        recyclerView.setAdapter(adapter);

        TextView name = findViewById(R.id.text_name);
        name.setText(order.getName());

        TextView quantity = findViewById(R.id.text_quantity);
        quantity.setText("x" + order.getQuantity());

        TextView price = findViewById(R.id.text_price);
        price.setText(Order.formatPrice(order.getPrice(), this));

        TextView size = findViewById(R.id.text_size);
        size.setText(order.getSize().getName(this));
    }
}


