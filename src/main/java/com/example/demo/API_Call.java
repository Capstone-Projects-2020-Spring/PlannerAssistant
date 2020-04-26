package com.example.demo;

import java.io.IOException;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class API_Call {

    private final PlannerServerApplication run;

    public API_Call(PlannerServerApplication run) {
        this.run = run;
    }

    @GetMapping("query")
    public String Query(@RequestParam(value = "location", required = true) String location,
            @RequestParam(value = "categoryString", required = true) String categoryString) throws IOException {

        String category = run.GetKeywordFromPhrase(categoryString);
        ArrayList<Business> businesses = run.GetBusinessesFromYelpAPI(location, category);

        return run.GetBusinessesJson(businesses);
    }

}
