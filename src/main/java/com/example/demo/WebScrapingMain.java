/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo;

import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;
import okhttp3.*;
import okhttp3.Request.Builder;
import org.json.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Month;
import java.util.Calendar;
import java.util.Date;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
/**
 *
 * @author: Alla Ryan
 */

@SpringBootApplication
public class WebScrapingMain {

//    public static void main(String[] args) throws IOException, JSONException {
//        ArrayList<Business> businesses = new ArrayList<Business>();
//
//        boolean input = false;
//
//        while (input == false) {
//            // valid input: city, state, both, zipcode
//            System.out.print("State city and state : ");
//            Scanner scannerLoc = new Scanner(System.in);
//            String location = scannerLoc.nextLine();
//
//            System.out.print("What would you like to do? : ");
//            Scanner scannerCat = new Scanner(System.in);
//            String phrase = scannerCat.nextLine(); //args[0];   
//
//            System.out.print("What Date? For example, April 20) : ");
//            Scanner scannerDate = new Scanner(System.in);
//            String sDate = scannerDate.nextLine();
//            
//            System.out.print("Please, say start time, For example, 4 pm) : ");
//            Scanner scannerStartTime = new Scanner(System.in);
//            String startTime = scannerStartTime.nextLine();
//            
//            System.out.print("Please, say end time, For example, 7 pm) : ");
//            Scanner scannerEndTime = new Scanner(System.in);
//            String endTime = scannerEndTime.nextLine();
//
//            System.out.println("Start Date, End Date: " + 
//                    GetUniversalDateTime(GetDateString(sDate),GetTimeString(startTime)) + "," +
//                    GetUniversalDateTime(GetDateString(sDate),GetTimeString(endTime)));
//            
//            /* Search against keywords */
//            String category = GetKeywordFromPhrase(phrase);
//            if (category != "") {
//                System.out.println("Keyword read: " + category + "\n" + "Location read: " + location);
//            } else {
//                System.out.println("Category does not exist. Using default category, the most popular places in the location" + "\n" + "Location read: " + location);
//            }
//
//            try {
//                businesses = GetBusinessesFromYelpAPI(location, category);
//            } catch (JSONException ex) {
//                System.out.println("This location does not exist. Please, say another location...");
//                input = false;
//            }
//            input = true;
//        }
//
//        System.out.println(GetBusinessesJson(businesses));
//        System.exit(0);
//    }
// returns first found keyword from the user's answer to "what would you like to do?" 

    public static String GetKeywordFromPhrase(String phrase) {
        String strReturn = "";
        if (phrase.length() > 1) {
            String[] strSplit = phrase.split("\\s+");
            for (String strSplit1 : strSplit) {
                if (!"".equals(getKeywords(strSplit1))) {
                    strReturn = getKeywords(strSplit1);
                }
            }
        }

        return strReturn;
    }
    
    public static String GetUniversalDateTime(String dateInput, String timeInput)
    {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd:hh:mm:ss");
        Date convertedDate = new Date();
        
        String dateStr = dateInput + ":";
        dateStr += timeInput + ":00:00";    
         
        try 
        {
            convertedDate = sdf.parse(dateStr);
        } catch (ParseException e) {
            return toUTCString(convertedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS zzz");
        }
        return toUTCString(convertedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS zzz");
    }
            
    private static String GetMonthNumber(String monthName) 
    {
        int month = Month.valueOf(monthName.toUpperCase()).getValue();
        if (month < 10)
            return String.valueOf("0" + Month.valueOf(monthName.toUpperCase()).getValue());
        else
            return String.valueOf(Month.valueOf(monthName.toUpperCase()).getValue());
    }
    
    public static String GetDateString(String dateInput)
    {
        String month = String.valueOf(Calendar.getInstance().get(Calendar.MONTH));
        String day = String.valueOf(Calendar.getInstance().get(Calendar.DATE));
        String year = String.valueOf(Calendar.getInstance().get(Calendar.YEAR));
        String dateStr = "";
        
        if (dateInput.length() > 0) {
            String[] strSplit = dateInput.split("\\s+");
                        
            day = strSplit[1];
            month = GetMonthNumber(strSplit[0]);
            dateStr = year + "-" + month + "-" + day;           
        }
        return dateStr;   
    }
    
    public static String GetTimeString(String timeInput) 
    {  
        String hour = "12:00";
        String minutes = "00";
        String partOfDay = "p.m.";
        Integer intTimeOfDay = 0;
        
        if (timeInput.length() > 0) {
            String[] strSplit = timeInput.split("\\s+");
            hour = strSplit[0];    
            if(hour != "")
            {
                if(hour.contains(":"))
                {
                    minutes = hour.split(":")[1];
                    intTimeOfDay = Integer.parseInt(hour.split(":")[0]);
                }
                else
                    intTimeOfDay = Integer.parseInt(hour);
            }
                            
            partOfDay = strSplit[1];
            if(partOfDay != "")
            {
                partOfDay = partOfDay.replace(".", "");
                if("pm".equals(partOfDay))
                intTimeOfDay = (intTimeOfDay + 12);
            }     
            
            hour = intTimeOfDay.toString() + ":" + minutes;
        }
       return hour;
    }

    private static String toUTCString(final Date date, final String format) {
        //final TimeZone tz = TimeZone.getTimeZone(timezone);
        final SimpleDateFormat formatter = new SimpleDateFormat(format);
        //formatter.setTimeZone(tz);
        return formatter.format(date);
    }

    public static ArrayList<Business> GetBusinessesFromYelpAPI(String location, String category) throws JSONException {
        ArrayList<Business> businesses = new ArrayList<Business>();
        String search_url = "https://api.yelp.com/v3/businesses/search?term=";

        String accessToken = null;
        /* This api key was generated on my machine, it may need to be regenerated if the run fails */
        accessToken = "ZgVZtFbDzup5KFml-GRGxnuKLtQBTDH5Qb4hHsul4MnrkeNXka_5fk_fvT9-emGewhV_4LjbDplML17HXUS0He2a8vy_UXFCdkoFbm9Li4D8sc5dhzLTsqiNIsqAXnYx"; //jsonObjectToken.getString("access_token");               

        // GET /businesses/search
        OkHttpClient client = new OkHttpClient();

        //String price = "2";                         // price        1 = $, 2 = $$, 3 = $$$, 4 = $$$$ 
        int limit = 10;                              // # of restaurants to return per request

        /* Make a request to Yelp API */
        Request request = new Builder()
                // .url(search_url + term + "&location=" + location + "&limit=1&sort_by=rating&price="+price+"")
                //.url(search_url + "&location=" + location + "&price=" + price + "&limit="+limit+"&sort_by=rating")
                .url(search_url + "&location=" + location + "&categories=" + category + "&limit=" + limit + "&sort_by=rating")
                .get()
                .addHeader("authorization", "Bearer" + " " + accessToken)
                .build();

        try {

            /* Get Response */
            Response response = client.newCall(request).execute();
            /* Convert response to JSON object */
            JSONObject jsonObject = new JSONObject(response.body().string().trim());
            /* Get a list of 'businesses' returned by API */
            JSONArray businessesArray = (JSONArray) jsonObject.get("businesses");

            //ArrayList<String> addressList = new ArrayList<>();
            Double lat = 0.0;
            Double lon = 0.0;

            /* Loop through businesses (entities) returned and fetch json object to pass into Restaurant() constructor */
            for (int i = 0; i < businessesArray.length(); i++) {
                JSONObject jsonBusiness = businessesArray.getJSONObject(i);
                String name = jsonBusiness.getString("name");
                String url = jsonBusiness.getString("url");
                String imageURL = jsonBusiness.getString("image_url");
                float rating = (float) jsonBusiness.getDouble("rating");
                /* Get categories - can be more than one */
                JSONArray categories = jsonBusiness.getJSONArray("categories");
                ArrayList<String> categoryList = getCategories(categories);
                /* Get Addresses */
                JSONObject addresses = jsonBusiness.getJSONObject("location");
                JSONArray displayAddresses = addresses.getJSONArray("display_address");
                ArrayList<String> addressList = getDisplayAddress(displayAddresses);

                //String priceTag = business.getString("price") == null? "" : business.getString("price");
                Double distance = jsonBusiness.getDouble("distance");

                JSONObject latObj = jsonBusiness.getJSONObject("coordinates");
                if (latObj != null) {
                    lat = latObj.getDouble("latitude");
                    lon = latObj.getDouble("longitude");
                }

                /* Create Restaurant(s) object */
                Business business = new Business(name, rating, url, imageURL, categoryList, addressList, distance, lat, lon);
                businesses.add(business);

            }

            //business #
//                int n =1;
//                for(int j=0; j<businesses.size(); j++)                  
//                {   
//                    System.out.println("");
//                    System.out.println("Business " + n++);
//                    System.out.println("Name: " + businesses.get(j).getName());
//                    System.out.println("Url: " + businesses.get(j).getUrl());
//                    System.out.println("Image Url: " + businesses.get(j).getImageURL());
//                    System.out.println("Rating: " + businesses.get(j).getRating());
//                    System.out.println("Categories: " + businesses.get(j).getCategories());
//                    System.out.println("Address: " + businesses.get(j).getAddress());
//                    System.out.println("Distance: " + businesses.get(j).getDistance());
//                    System.out.println("Coordinates: Lattitude: " + businesses.get(j).getLat() + ", Longtitude: "+ businesses.get(j).getLon());
//                }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JSONException jex) {
            throw (jex);
        }

        return businesses;
    }

    public static String GetBusinessesJson(ArrayList<Business> businesses) {
        Gson gsonBuilder = new GsonBuilder().create();
        String jsonFromBusiness = gsonBuilder.toJson(businesses);
        return jsonFromBusiness;
    }

    public static String getKeywords(String kWord) {
        String strReturn = "";
        /* may read from a .json file here */
        List<Category> keywords = new ArrayList<Category>();

        keywords.add(new Category("restaurants", new ArrayList() {
            {
                add("food");
                add("eat");
                add("dinner");
                add("lunch");
                add("diner");
                add("hungry");
                add("breakfast");
            }
        }));
        keywords.add(new Category("bars", new ArrayList() {
            {
                add("snack");
                add("drink");
                add("beer");
                add("wine");
                add("fingerfood");
                add("happyhour");
                add("yummy");
                add("delicious");
                add("bar");
            }
        }));
        keywords.add(new Category("movietheaters", new ArrayList() {
            {
                add("driveintheater");
                add("outdoormovies");
                add("cinema");
                add("theater");
                add("movies");
                add("thirsty");
            }
        }));
        // new cats added need more keywords
        keywords.add(new Category("active", new ArrayList() {
            {
                add("active");
                add("Tours");
                add("bike");
                add("skate");
                add("playground");
            }
        }));
        keywords.add(new Category("adult", new ArrayList() {
            {
                add("adult");
                add("lingerie");
                add("video");
                add("adults");
            }
        }));
        keywords.add(new Category("hotels", new ArrayList() {
            {
                add("hotel");
                add("sleep");
                add("crush");
            }
        }));
        keywords.add(new Category("museums", new ArrayList() {
            {
                add("museums");
                add("art");
                add("gallery");
            }
        }));
        keywords.add(new Category("tours", new ArrayList() {
            {
                add("tours");
                add("excursion");
                add("tour");
            }
        }));
        keywords.add(new Category("gyms", new ArrayList() {
            {
                add("sport");
                add("gym");
                add("trainer");
                add("yoga");
            }
        }));
        keywords.add(new Category("fashion", new ArrayList() {
            {
                add("fashion");
                add("designer");
                add("cloth");
                add("");
            }
        }));
        keywords.add(new Category("parks", new ArrayList() {
            {
                add("jogging");
                add("walking");
                add("park");
                add("nature");
            }
        }));

        for (int i = 0; i < keywords.size(); i++) {
            if (keywords.get(i).getSubcategories().contains(kWord)) {
                return keywords.get(i).getCategory();
            }
        }

        return strReturn;
    }

    private static boolean IsCategoryExist(String kWord) {
        boolean bReturn = false;
        try {
            List<Category> keywords;
            // convert JSON array to list of users
            try ( // create Gson instance
                    //Gson gson = new Gson();
                    // create a reader
                    Reader reader = Files.newBufferedReader(Paths.get("./categories.json"))) {
                // convert JSON array to list of users
                keywords = new Gson().fromJson(reader, new TypeToken<List<Category>>() {
                }.getType());
                keywords.forEach(System.out::println);
                reader.close();
            }

            for (int i = 0; i < keywords.size(); i++) {
                bReturn = keywords.get(i).getSubcategories().contains(kWord);
            }

        } catch (JsonIOException | JsonSyntaxException | IOException ex) {
        }
        return bReturn;
    }

    private static ArrayList<String> getCategories(JSONArray jArray) {
        ArrayList<String> listData = new ArrayList<>();

        try {
            if (jArray != null) {
                for (int i = 0; i < jArray.length(); i++) {
                    String title = jArray.getJSONObject(i).getString("title");
                    listData.add(title);
                }
            }
        } catch (JSONException ex) {
            ex.printStackTrace();
        }

        return listData;
    }

    private static ArrayList<String> getAddress(JSONObject json) {
        ArrayList<String> listData = new ArrayList<>();

        try {
            if (json != null) {
                /* To Do: loop through "display_address" array */
                //for (int i=0;i<jArray.length();i++){ 
                String address1 = json.getString("address1");
                String address2 = json.getString("address2");
                String address3 = json.isNull("address3") ? "" : json.getString(("address3"));
                String city = json.getString("city");
                String state = json.getString("state");
                String zip = json.getString("zip_code");
                String country = json.getString("country");
                listData.add(address1 + (address2 == null ? "" : ", " + address2) + (address3 == null ? "" : ", " + address3) + ", " + city + ", " + state + ", " + zip + ", " + country);
                //} 
            }
        } catch (JSONException ex) {
            ex.printStackTrace();
        }

        return listData;
    }

    private static ArrayList<String> getDisplayAddress(JSONArray jArray) {
        ArrayList<String> listData = new ArrayList<>();
        String address = "";
        try {
            if (jArray != null) {
                for (int i = 0; i < jArray.length(); i++) {
                    //if(jArray.getString(i) != null && jArray.getString(i).length() !=0)
                    address += jArray.getString(i) + ", ";
                }
                if (address.endsWith(", ")) {
                    address = address.substring(0, address.length() - 2);
                }
                listData.add(address);
            }
        } catch (JSONException ex) {
            ex.printStackTrace();
        }

        return listData;
    }

//    private static String readAll(Reader rd) throws IOException {
//        StringBuilder sb = new StringBuilder();
//        int cp;
//        while ((cp = rd.read()) != -1) {
//            sb.append((char) cp);
//        }
//        return sb.toString();
//    }

//    public static JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
//        InputStream is = new URL(url).openStream();
//        try {
//            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
//            String jsonText = readAll(rd);
//            JSONObject json = new JSONObject(jsonText);
//            return json;
//        } finally {
//            is.close();
//        }
//    }

}