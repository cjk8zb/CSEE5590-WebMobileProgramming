package edu.umkc.cjk8zb.mypizza;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.TextView;

import com.google.android.material.snackbar.Snackbar;

import androidx.annotation.IdRes;
import androidx.annotation.StringRes;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private final Order mOrder = new Order();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        RadioGroup group = findViewById(R.id.radio_group);
        group.check(R.id.radio_small);
        display(mOrder.getQuantity());
    }

    private void display(int number) {
        TextView quantityTextView = findViewById(R.id.quantity_text_view);
        quantityTextView.setText(String.valueOf(number));
    }

    public void submitOrder(View view) {
        updateOrder();
        sendEmail(mOrder.getSummary(this));
    }

    private void updateOrder() {
        RadioGroup group = findViewById(R.id.radio_group);
        switch (group.getCheckedRadioButtonId()) {
            case R.id.radio_small:
                mOrder.setSize(Order.Size.SMALL);
                break;
            case R.id.radio_medium:
                mOrder.setSize(Order.Size.MEDIUM);
                break;
            case R.id.radio_large:
                mOrder.setSize(Order.Size.LARGE);
                break;
        }

        EditText userInputNameView = findViewById(R.id.user_input);
        mOrder.setName(userInputNameView.getText().toString());

        setTopping(Order.Topping.PEPPERONI, R.id.checked_pepperoni);
        setTopping(Order.Topping.MUSHROOMS, R.id.checked_mushrooms);
        setTopping(Order.Topping.ONIONS, R.id.checked_onions);
        setTopping(Order.Topping.SAUSAGE, R.id.checked_sausage);
        setTopping(Order.Topping.BACON, R.id.checked_bacon);
        setTopping(Order.Topping.EXTRA_CHEESE, R.id.checked_extra_cheese);
        setTopping(Order.Topping.BLACK_OLIVES, R.id.checked_black_olives);
        setTopping(Order.Topping.GREEN_PEPPERS, R.id.checked_green_peppers);
        setTopping(Order.Topping.PINEAPPLE, R.id.checked_pineapple);
        setTopping(Order.Topping.SPINACH, R.id.checked_spinach);
    }

    private void sendEmail(String text) {
        Intent intent = new Intent(Intent.ACTION_SENDTO, Uri.parse("mailto:"));
        intent.putExtra(Intent.EXTRA_TEXT, text);

        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivity(intent);
        } else {
            startActivity(Intent.createChooser(intent, "Send email..."));
        }
    }

    private void setTopping(Order.Topping topping, @IdRes int checkboxId) {
        CheckBox item = findViewById(checkboxId);
        if (item.isChecked()) {
            mOrder.addTopping(topping);
        } else {
            mOrder.removeTopping(topping);
        }
    }

    public void showSummary(View view) {
        updateOrder();
        Intent i = new Intent(MainActivity.this, SummaryActivity.class);
        i.putExtra("order", mOrder);
        startActivity(i);
    }

    public void increment(View view) {
        if (mOrder.getQuantity() < 100) {
            mOrder.incrementQuantity();
            display(mOrder.getQuantity());
        } else {
            showError(R.string.too_much, view);
        }
    }

    public void decrement(View view) {
        if (mOrder.getQuantity() > 1) {
            mOrder.decrementQuantity();
            display(mOrder.getQuantity());
        } else {
            showError(R.string.too_little, view);
        }
    }

    private void showError(@StringRes int id, View view) {
        Snackbar.make(view, id, Snackbar.LENGTH_SHORT).show();
    }

}