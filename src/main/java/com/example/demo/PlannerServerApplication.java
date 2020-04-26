package com.example.demo;

import static com.example.demo.WebScrapingMain.GetBusinessesFromYelpAPI;
import static com.example.demo.WebScrapingMain.GetBusinessesJson;
import static com.example.demo.WebScrapingMain.GetDateString;
import static com.example.demo.WebScrapingMain.GetKeywordFromPhrase;
import static com.example.demo.WebScrapingMain.GetTimeString;
import static com.example.demo.WebScrapingMain.GetUniversalDateTime;
import java.util.ArrayList;
import java.util.Scanner;
import org.json.JSONException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PlannerServerApplication {

	public static void main(String[] args) {
        
            ArrayList<Business> businesses = new ArrayList<Business>();

            boolean input = false;

            while (input == false) {
            // valid input: city, state, both, zipcode
            System.out.print("State city and state : ");
            Scanner scannerLoc = new Scanner(System.in);
            String location = scannerLoc.nextLine();

            System.out.print("What would you like to do? : ");
            Scanner scannerCat = new Scanner(System.in);
            String phrase = scannerCat.nextLine(); //args[0];   

            System.out.print("What Date? For example, April 20) : ");
            Scanner scannerDate = new Scanner(System.in);
            String sDate = scannerDate.nextLine();

            System.out.print("Please, say start time, For example, 4 pm) : ");
            Scanner scannerStartTime = new Scanner(System.in);
            String startTime = scannerStartTime.nextLine();

            System.out.print("Please, say end time, For example, 7 pm) : ");
            Scanner scannerEndTime = new Scanner(System.in);
            String endTime = scannerEndTime.nextLine();

            System.out.println("Start Date, End Date: " + 
                    GetUniversalDateTime(GetDateString(sDate),GetTimeString(startTime)) + "," +
                    GetUniversalDateTime(GetDateString(sDate),GetTimeString(endTime)));

            /* Search against keywords */
            String category = GetKeywordFromPhrase(phrase);
            if (category != "") {
                System.out.println("Keyword read: " + category + "\n" + "Location read: " + location);
            } else {
                System.out.println("Category does not exist. Using default category, the most popular places in the location" + "\n" + "Location read: " + location);
            }

            try {
                businesses = GetBusinessesFromYelpAPI(location, category);
            } catch (JSONException ex) {
                System.out.println("This location does not exist. Please, say another location...");
                input = false;
            }
            input = true;
        }

        System.out.println(GetBusinessesJson(businesses));
        //System.exit(0);
	}

}
