/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo;

import java.util.ArrayList;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author user
 */
public class Business  {
  
    private String name;
    private float rating;   
    private String url;
    private String imageURL;
    private ArrayList<String> categories;
    private ArrayList<String> address;  
    private String price;
    private double distance;
    private double lat;
    private double lon;
  
    public Business(){}

    public Business(String name, float rating, 
                      String url, String imageURL, ArrayList<String> categories, ArrayList<String> address,
                      double distance, double lat, double lon) {
        this.name = name;
        this.rating = rating;
    
        this.url = url;
        this.imageURL = imageURL;
        this.categories = categories;
        this.address = address;
      
        this.price = price;
        this.distance = distance;
        this.lat = lat;
        this.lon = lon;
    }

    

    public String getName() {
        return name;
    }

    public double getRating() {
        return rating;
    }

    public String getUrl() {
        return url;
    }
    
    public String getImageURL() {
        return imageURL;
    }

    public ArrayList<String> getCategories() {
        return categories;
    }

    public ArrayList<String> getAddress() {
        return address;
    }

    public String getPrice() {
        return price;
    }

    public double getDistance() {
        return distance;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }
    public void setName(String name) {
        this.name = name;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setCategories(ArrayList<String> categories) {
        this.categories = categories;
    }

    public void setAddress(ArrayList<String> address) {
        this.address = address;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    @Override
    public String toString() {
        return "Restaurant{" + "name=" + name + ", rating=" + rating + ", url=" + url + ", imageURL=" + imageURL + ", categories=" + categories + ", address=" + address + ", price=" + price + ", distance=" + distance + ", lat=" + lat + ", lon=" + lon + '}';
    }
    
}