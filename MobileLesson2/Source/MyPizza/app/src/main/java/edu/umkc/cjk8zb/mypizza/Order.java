package edu.umkc.cjk8zb.mypizza;

import android.content.Context;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import androidx.annotation.StringRes;

public class Order implements Serializable {
    private final EnumSet<Topping> mToppings;
    private Size mSize;
    private String mName;
    private int mQuantity;

    public Order() {
        mSize = Size.SMALL;
        mToppings = EnumSet.noneOf(Topping.class);
        mName = "";
        mQuantity = 1;
    }

    public int getQuantity() {
        return mQuantity;
    }

    public Size getSize() {
        return mSize;
    }

    public void setSize(final Size size) {
        mSize = size;
    }

    public String getName() {
        return mName;
    }

    public void setName(final String name) {
        mName = name;
    }

    public void addTopping(final Topping topping) {
        mToppings.add(topping);
    }

    public void removeTopping(final Topping topping) {
        mToppings.remove(topping);
    }

    public List<Topping> getToppings() {
        return new ArrayList<>(mToppings);
    }

    public void incrementQuantity() {
        mQuantity += 1;
    }

    public void decrementQuantity() {
        mQuantity -= 1;
    }

    public String getSummary(Context context) {
        List<String> summary = new ArrayList<>();
        summary.add(context.getString(R.string.order_summary_name, mName));
        summary.add(context.getString(R.string.order_summary_size, mSize.getName(context), formatPrice(mSize.getPrice(), context)));

        for (Topping topping : mToppings) {
            summary.add(context.getString(R.string.order_summary_topping, topping.getName(context), formatPrice(topping.getPrice(), context)));
        }

        summary.add(context.getString(R.string.order_summary_quantity, mQuantity));
        summary.add(context.getString(R.string.order_summary_total_price, formatPrice(getPrice(), context)));
        summary.add(context.getString(R.string.thank_you));


        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            return String.join("\n", summary);
        }

        StringBuilder stringBuilder = new StringBuilder();

        for (String city : summary) {
            stringBuilder.append(city).append("\n");
        }

        return stringBuilder.toString();
    }

    public static String formatPrice(@StringRes int price, Context context) {
        return context.getString(R.string.format_price, price * 0.01);
    }

    public int getPrice() {
        int basePrice = mSize.getPrice();
        for (Topping topping : mToppings) {
            basePrice += topping.getPrice();
        }
        return mQuantity * basePrice;
    }

    public enum Size {
        SMALL(R.string.size_small, 599),
        MEDIUM(R.string.size_medium, 899),
        LARGE(R.string.size_large, 1299);

        private final @StringRes
        int resId;
        private final int price;

        Size(@StringRes int resId, final int price) {
            this.resId = resId;
            this.price = price;
        }

        int getPrice() {
            return this.price;
        }

        String getName(Context context) {
            return context.getString(resId);
        }
    }

    public enum Topping {

        PEPPERONI(R.string.topping_pepperoni, 25),
        MUSHROOMS(R.string.topping_mushrooms, 25),
        ONIONS(R.string.topping_onions, 25),
        SAUSAGE(R.string.topping_sausage, 25),
        BACON(R.string.topping_bacon, 50),
        EXTRA_CHEESE(R.string.topping_extra_cheese, 0),
        BLACK_OLIVES(R.string.topping_black_olives, 25),
        GREEN_PEPPERS(R.string.topping_green_peppers, 25),
        PINEAPPLE(R.string.topping_pineapple, 50),
        SPINACH(R.string.topping_spinach, 100);

        private final @StringRes
        int resId;
        private final int price;

        Topping(@StringRes int resId, final int price) {
            this.resId = resId;
            this.price = price;
        }

        public int getPrice() {
            return this.price;
        }

        String getName(Context context) {
            return context.getString(resId);
        }

        public @StringRes
        int getResId() {
            return this.resId;
        }
    }
}
