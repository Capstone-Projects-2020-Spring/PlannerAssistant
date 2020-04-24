package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class API_Call {

    private final WebScrapingJava webscp;
	
    @GetMapping("query")
    public String Query(@RequestParam(value = "queryString", required = true) String queryString) {

    String user_query = queryString;

    webscp.getKeywords(queryString);
		
    //Call any functions here to do any analysis, 
    //store those Java files in this project and create the class instances in this files constructor
		
    //This string should be the JSON Object response thats converted into a string via GSON thats to be output to the user
    return ""; 
    }
	
}
