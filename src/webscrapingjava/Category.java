/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webscrapingjava;

import java.util.List;

/**
 *
 * @author user
 */
public class Category {
    private String category;
    private List<String> subcategories;

    public String getCategory() {
        return category;
    }
    
    public String getCategoryBySubcategory(String subcategory)
    {
        String strReturn = "";
        
        if(subcategories.contains(subcategory))
            strReturn = getCategory();
        
        return strReturn;
    }

    public List<String> getSubcategories() {
        return subcategories;
    }

    public void setSubcategory(List<String> subcategories) {
        this.subcategories = subcategories;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Category(String category, List<String> subcategories) {
        this.category = category;
        this.subcategories = subcategories;
    }
}
