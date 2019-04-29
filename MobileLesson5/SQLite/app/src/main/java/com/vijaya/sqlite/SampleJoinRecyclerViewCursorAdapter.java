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

import com.vijaya.sqlite.databinding.EmployeeListItemBinding;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class SampleJoinRecyclerViewCursorAdapter extends RecyclerView.Adapter<SampleJoinRecyclerViewCursorAdapter.ViewHolder> {

    Context mContext;
    Cursor mCursor;

    public SampleJoinRecyclerViewCursorAdapter(Context context, Cursor cursor) {

        mContext = context;
        mCursor = cursor;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        EmployeeListItemBinding itemBinding;

        public ViewHolder(View itemView) {
            super(itemView);
            itemBinding = DataBindingUtil.bind(itemView);
        }

        public void bindCursor(Cursor cursor) {
            itemBinding.firstnameLabel.setText(cursor.getString(
                    cursor.getColumnIndexOrThrow(SampleDBContract.Employee.COLUMN_FIRSTNAME)
            ));
            itemBinding.lastnameLabel.setText(cursor.getString(
                    cursor.getColumnIndexOrThrow(SampleDBContract.Employee.COLUMN_LASTNAME)
            ));
            itemBinding.jobDescLabel.setText(cursor.getString(
                    cursor.getColumnIndexOrThrow(SampleDBContract.Employee.COLUMN_JOB_DESCRIPTION)
            ));

            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(cursor.getLong(
                    cursor.getColumnIndexOrThrow(SampleDBContract.Employee.COLUMN_DATE_OF_BIRTH)));
            itemBinding.dobLabel.setText(new SimpleDateFormat("dd/MM/yyyy").format(calendar.getTime()));

            calendar.setTimeInMillis(cursor.getLong(
                    cursor.getColumnIndexOrThrow(SampleDBContract.Employee.COLUMN_EMPLOYED_DATE)));
            itemBinding.employedLabel.setText(new SimpleDateFormat("dd/MM/yyyy").format(calendar.getTime()));

            itemBinding.nameLabel.setText(cursor.getString(
                    cursor.getColumnIndexOrThrow(SampleDBContract.Employer.COLUMN_NAME)
            ));
            itemBinding.descLabel.setText(cursor.getString(
                    cursor.getColumnIndexOrThrow(SampleDBContract.Employer.COLUMN_DESCRIPTION)
            ));

            calendar.setTimeInMillis(cursor.getLong(
                    cursor.getColumnIndexOrThrow(SampleDBContract.Employer.COLUMN_FOUNDED_DATE)));
            itemBinding.foundedLabel.setText(new SimpleDateFormat("dd/MM/yyyy").format(calendar.getTime()));

            final String itemId = cursor.getString(cursor.getColumnIndex(SampleDBContract.Employer._ID));
            itemBinding.updateButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(final View v) {
                    updateDB(v.getContext(), itemId);
                }
            });

            itemBinding.deleteButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(final View v) {
                    deleteDB(v.getContext(), itemId);
                }
            });
        }

        private void deleteDB(final Context context, final String itemId) {
            SQLiteDatabase database = new SampleDBSQLiteHelper(context).getWritableDatabase();
            long deleteCount = database.delete(
                    SampleDBContract.Employee.TABLE_NAME,
                    SampleDBContract.Employee._ID + "=?",
                    new String[]{itemId}
            );

            Toast.makeText(context, "Deleted " + deleteCount + " row(s).", Toast.LENGTH_LONG).show();
        }

        private void updateDB(final Context context, final String itemId) {
            SQLiteDatabase database = new SampleDBSQLiteHelper(context).getWritableDatabase();
            ContentValues values = new ContentValues();
            values.put(SampleDBContract.Employee.COLUMN_FIRSTNAME, itemBinding.firstnameLabel.getText().toString());
            values.put(SampleDBContract.Employee.COLUMN_LASTNAME, itemBinding.lastnameLabel.getText().toString());
            values.put(SampleDBContract.Employee.COLUMN_JOB_DESCRIPTION, itemBinding.jobDescLabel.getText().toString());

            try {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime((new SimpleDateFormat("dd/MM/yyyy")).parse(
                        itemBinding.dobLabel.getText().toString()));
                long date = calendar.getTimeInMillis();
                values.put(SampleDBContract.Employee.COLUMN_DATE_OF_BIRTH, date);

                calendar.setTime((new SimpleDateFormat("dd/MM/yyyy")).parse(
                        itemBinding.employedLabel.getText().toString()));
                date = calendar.getTimeInMillis();
                values.put(SampleDBContract.Employee.COLUMN_EMPLOYED_DATE, date);
            } catch (Exception e) {
                Toast.makeText(context, "Date is in the wrong format", Toast.LENGTH_LONG).show();
                return;
            }

            long updateCount = database.update(
                    SampleDBContract.Employee.TABLE_NAME,
                    values,
                    SampleDBContract.Employee._ID + "=?",
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
        holder.bindCursor(mCursor);
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(
                R.layout.employee_list_item, parent, false);
        ViewHolder viewHolder = new ViewHolder(view);
        return viewHolder;
    }
}