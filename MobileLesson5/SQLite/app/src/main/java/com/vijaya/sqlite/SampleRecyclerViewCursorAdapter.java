package com.vijaya.sqlite;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.databinding.DataBindingUtil;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.vijaya.sqlite.databinding.EmployerListItemBinding;

import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * Created by obaro on 26/09/2016.
 */

public class SampleRecyclerViewCursorAdapter extends RecyclerView.Adapter<SampleRecyclerViewCursorAdapter.ViewHolder> {

    Context mContext;
    Cursor mCursor;

    public SampleRecyclerViewCursorAdapter(Context context, Cursor cursor) {

        mContext = context;
        mCursor = cursor;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        EmployerListItemBinding itemBinding;

        public ViewHolder(View itemView) {
            super(itemView);
            itemBinding = DataBindingUtil.bind(itemView);
        }

        public void bindCursor(final Cursor cursor, final RecyclerView.Adapter adapter) {
            itemBinding.nameLabel.setText(cursor.getString(
                    cursor.getColumnIndexOrThrow(SampleDBContract.Employer.COLUMN_NAME)
            ));
            itemBinding.descLabel.setText(cursor.getString(
                    cursor.getColumnIndexOrThrow(SampleDBContract.Employer.COLUMN_DESCRIPTION)
            ));

            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(cursor.getLong(
                    cursor.getColumnIndexOrThrow(SampleDBContract.Employer.COLUMN_FOUNDED_DATE)));
            itemBinding.foundedLabel.setText(new SimpleDateFormat("dd/MM/yyyy").format(calendar.getTime()));

            final String itemId = cursor.getString(cursor.getColumnIndex(SampleDBContract.Employer._ID));
            itemBinding.updateButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    updateDB(view.getContext(), itemId);
                }
            });

            final int position = getAdapterPosition();
            itemBinding.deleteButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    deleteDB(view.getContext(), itemId);
                }
            });
        }

        private void deleteDB(final Context context, final String itemId) {
            SQLiteDatabase database = new SampleDBSQLiteHelper(context).getWritableDatabase();
            long deleteCount = database.delete(
                    SampleDBContract.Employer.TABLE_NAME,
                    SampleDBContract.Employer._ID + "=?",
                    new String[]{itemId}
            );

            Toast.makeText(context, "Deleted " + deleteCount + " row(s).", Toast.LENGTH_LONG).show();
        }

        private void updateDB(Context context, String itemId) {
            SQLiteDatabase database = new SampleDBSQLiteHelper(context).getWritableDatabase();
            ContentValues values = new ContentValues();
            values.put(SampleDBContract.Employer.COLUMN_NAME, itemBinding.nameLabel.getText().toString());
            values.put(SampleDBContract.Employer.COLUMN_DESCRIPTION, itemBinding.descLabel.getText().toString());

            try {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime((new SimpleDateFormat("dd/MM/yyyy")).parse(
                        itemBinding.foundedLabel.getText().toString()));
                long date = calendar.getTimeInMillis();
                values.put(SampleDBContract.Employer.COLUMN_FOUNDED_DATE, date);
            } catch (Exception e) {
                Toast.makeText(context, "Date is in the wrong format", Toast.LENGTH_LONG).show();
                return;
            }

            long updateCount = database.update(
                    SampleDBContract.Employer.TABLE_NAME,
                    values,
                    SampleDBContract.Employer._ID + "=?",
                    new String[]{itemId}
            );

            Toast.makeText(context, "Updated " + updateCount + " row(s).", Toast.LENGTH_LONG).show();
        }
    }


    @Override
    public int getItemCount() {
        return mCursor.getCount();
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        mCursor.moveToPosition(position);
        holder.bindCursor(mCursor, this);
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(
                R.layout.employer_list_item, parent, false);
        ViewHolder viewHolder = new ViewHolder(view);
        return viewHolder;
    }
}