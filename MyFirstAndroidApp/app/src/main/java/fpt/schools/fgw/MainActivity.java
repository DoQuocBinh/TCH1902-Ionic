package fpt.schools.fgw;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Random;

public class MainActivity extends AppCompatActivity {

    public void sendClick(View view){
        //find the textbox
        EditText text = findViewById(R.id.editTextTextPersonName2);
        String userInput = text.getText().toString().trim();
        if(userInput.length() ==0){
            //set error for text
            text.setError("You need to enter a name!");
        }else {
            TextView greeting =  findViewById(R.id.greetingView);
            greeting.setText("Hello " + userInput);
        }
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Random random = new Random();
        //a random number from 0 to 99
        int grade = random.nextInt(100);
        grade++;
        TextView greeting =  findViewById(R.id.greetingView);
        greeting.setText("Good morning!");
        if (grade >=50){
            greeting.append("\nCongrats, your grade is: " + grade);
        }else{
            greeting.append("\nSorry your grade is: " + grade);
        }
    }
}