/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webscrapingjava;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import jdk.nashorn.internal.objects.NativeArray;
import okhttp3.*;
import okhttp3.Request.Builder;
import org.json.*;
/**
 *
 * @author: Alla Ryan
 */
public class WebScrapingJava {

    public static void main(String[] args) throws IOException, JSONException {
        String search_url = "https://api.yelp.com/v3/businesses/search?term=";

        String accessToken=null;
        /* This api key was generated on my machine, it may need to be regenerated if the run fails */
        accessToken = "ZgVZtFbDzup5KFml-GRGxnuKLtQBTDH5Qb4hHsul4MnrkeNXka_5fk_fvT9-emGewhV_4LjbDplML17HXUS0He2a8vy_UXFCdkoFbm9Li4D8sc5dhzLTsqiNIsqAXnYx"; //jsonObjectToken.getString("access_token");
        ArrayList<Restaurant> rests = new ArrayList<Restaurant>();       
       
            // GET /businesses/search
            OkHttpClient client = new OkHttpClient();

            /*  To Do: Need to ask user for location, i.e. 
            *** term and price are now optional ***/
            
            //String term = "taco";                       // term
            String location = "Irivine, CA";            // location
            //String price = "1";                         // price        1 = $, 2 = $$, 3 = $$$, 4 = $$$$
            int limit = 5;                              // # of restaurants to return per request

            
            /* Make a request to Yelp API */
            Request request = new Builder()
//                  .url(search_url + term + "&location=" + location + "&limit=1&sort_by=rating&price="+price+"")
                    .url(search_url + "&location=" + location + "&limit="+limit+"&sort_by=rating")
                    .get()
                    .addHeader("authorization", "Bearer"+" "+accessToken)
                    .build();

            try {

                /* Get Response */
                Response response = client.newCall(request).execute();
                /* Convert response to JSON object */
                JSONObject jsonObject = new JSONObject(response.body().string().trim());
                /* Get a list of 'businesses' returned by API */
                JSONArray businesses = (JSONArray)jsonObject.get("businesses");

                ArrayList<String> addressList = new ArrayList<>();
                Double lat = 0.0;
                Double lon = 0.0;
                
                /* Loop through businesses (entities) returned and fetch json object to pass into Restaurant() constructor */
                for(int i=0; i<businesses.length(); i++)
                {
                    JSONObject business = businesses.getJSONObject(i);
                    String name = business.getString("name"); 
                    String url = business.getString("url");   
                    String imageURL = business.getString("image_url");
                    float rating = (float)business.getDouble("rating");  
                    /* Get categories - can be more than one */
                    JSONArray categories = business.getJSONArray("categories");
                    ArrayList<String> categoryList = getCategories(categories);
                    /* Get Addresses */
                    JSONObject addresses = business.getJSONObject("location");
                    if(addresses !=null){
                        addressList = getAddress(addresses);
                    }
                    String priceTag = business.getString("price");
                    Double distance = business.getDouble("distance");

                    JSONObject latObj = business.getJSONObject("coordinates");
                    if(latObj !=null){
                        lat = latObj.getDouble("latitude");
                        lon = latObj.getDouble("longitude");
                    }
                    
                    /* Create Restaurant(s) object */
                    Restaurant rest = new Restaurant(name,rating,url,imageURL,categoryList,addressList,priceTag,distance,lat,lon);
                    rests.add(rest);
                }
                
                for(int j=0; j<rests.size(); j++)
                {
                    System.out.println("");
                    System.out.println("Restaurant " + j);
                    System.out.println("Name: " + rests.get(j).getName());
                    System.out.println("Url: " + rests.get(j).getUrl());
                    System.out.println("Image Url: " + rests.get(j).getImageURL());
                    System.out.println("Rating: " + rests.get(j).getRating());
                    System.out.println("Categories: " + rests.get(j).getCategories());
                    System.out.println("Address: " + rests.get(j).getAddress());
                    System.out.println("Price: " + rests.get(j).getPrice());
                    System.out.println("Distance: " + rests.get(j).getDistance());
                    System.out.println("Coordinates: Lattitude: " + rests.get(j).getLat() + ", Longtitude: "+ rests.get(j).getLon());
                }
            } 
            catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
  }
    
    
 private static ArrayList<String> getCategories(JSONArray jArray)
 {
     ArrayList<String> listData = new ArrayList<>();
     
     try{
        if (jArray != null) {           
           for (int i=0;i<jArray.length();i++){ 
           String title = jArray.getJSONObject(i).getString("title");
           listData.add(title);
          } 
       } 
     }
     catch(JSONException ex){ ex.printStackTrace();}
     
     return listData;
 }
 
 private static ArrayList<String> getAddress(JSONObject json)
 {
     ArrayList<String> listData = new ArrayList<>();
     
     try{
        if (json != null) {           
           /* To Do: loop through "display_address" array */
           //for (int i=0;i<jArray.length();i++){ 
           String address1 = json.getString("address1");
           String address2 = json.getString("address2");
           String address3 = json.isNull("address3")? "": json.getString(("address3"));
           String city = json.getString("city");
           String state = json.getString("state");
           String zip = json.getString("zip_code");
           String country = json.getString("country");
           listData.add(address1 + (address2==null? "": ", "+address2) + (address3==null? "": ", "+address3) + ", "+city + ", "+state + ", "+zip + ", " +country );
          //} 
       } 
     }
     catch(JSONException ex){ 
         ex.printStackTrace();
     }
     
     return listData;
 }
    
 private static String readAll(Reader rd) throws IOException {
    StringBuilder sb = new StringBuilder();
    int cp;
    while ((cp = rd.read()) != -1) {
      sb.append((char) cp);
    }
    return sb.toString();
  }

  public static JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
    InputStream is = new URL(url).openStream();
    try {
      BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
      String jsonText = readAll(rd);
      JSONObject json = new JSONObject(jsonText);
      return json;
    } finally {
      is.close();
    }
  }

  

}
