package com.example.quickreviewandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    public void okClickHandler(View view){
       EditText txtName = findViewById(R.id.txtName);
       EditText txtEmail = findViewById(R.id.txtEmail);

       String name = txtName.getText().toString();
       String email = txtEmail.getText().toString();

       TextView myLabel =  findViewById(R.id.textView2);
       boolean isError = false;
       if(name.length()==0){
           txtName.setError("Name is required!");
           isError = true;
       }
        if(email.length()==0){
            txtEmail.setError("Email is required!");
            isError = true;
        }
        if(!isError){
            myLabel.setText("Hello " + name + ", your email is " + email);
        }
    }
}