package cjk8zb.umkc.edu.icp8;

import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

public class LoginActivity extends AppCompatActivity {
    private static final String[] CREDENTIALS = new String[]{
            "cam:asdf", "mojo:dog"
    };
    TextView mUsernameTextView;
    TextView mPasswordTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mUsernameTextView = findViewById(R.id.username);
        mPasswordTextView = findViewById(R.id.password);

        mUsernameTextView.setOnEditorActionListener(this::handleAction);
        mPasswordTextView.setOnEditorActionListener(this::handleAction);

        findViewById(R.id.actionLogin).setOnClickListener(v -> verifyCredentials());
    }

    private boolean handleAction(TextView v, int actionId, KeyEvent event) {
        if (v == mUsernameTextView) {
            mPasswordTextView.requestFocus();
            return true;
        }
        if (v == mPasswordTextView) {
            verifyCredentials();
            return true;
        }
        return false;
    }

    private void verifyCredentials() {

        String password = mPasswordTextView.getText().toString();
        if (password.isEmpty()) {
            mPasswordTextView.setError(getString(R.string.error_field_required));
            mPasswordTextView.requestFocus();
        }

        String username = mUsernameTextView.getText().toString();
        if (username.isEmpty()) {
            mUsernameTextView.setError(getString(R.string.error_field_required));
            mUsernameTextView.requestFocus();
        }

        if (valid(username, password)) {
            Intent i = new Intent(LoginActivity.this, MainActivity.class);
            i.putExtra(MainActivity.USERNAME, username);
            startActivity(i);
        } else {
            AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();
            alertDialog.setTitle(getString(R.string.error_title));
            alertDialog.setMessage(getString(R.string.error_invalid_credentials));
            alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, getString(R.string.error_ok), (dialog, which) -> dialog.dismiss());
            alertDialog.show();
        }
    }

    private boolean valid(String username, String password) {
        for (String credential : CREDENTIALS) {
            String[] pieces = credential.split(":");
            if (pieces[0].equals(username)) {
                // Account exists, return true if the password matches.
                return pieces[1].equals(password);
            }
        }

        return false;
    }
}
