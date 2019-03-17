package cjk8zb.umkc.edu.icp8;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    public static final String USERNAME = "cjk8zb.umkc.edu.icp8.MainActivity.USERNAME";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String username = getIntent().getStringExtra(USERNAME);

        setContentView(R.layout.activity_main);
        findViewById(R.id.actionLogout).setOnClickListener(v -> logout());
        TextView usernameTextView = findViewById(R.id.textView);
        usernameTextView.setText(String.format(getString(R.string.format_welcome), username));
    }

    private void logout() {
        finish();
//        Intent i = new Intent(MainActivity.this, LoginActivity.class);
//        startActivity(i);
    }
}
