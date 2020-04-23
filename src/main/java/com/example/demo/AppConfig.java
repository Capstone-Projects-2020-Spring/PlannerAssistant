/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webscrapingjava;

import org.springframework.context.annotation.Configuration;

/**
 *
 * @author Alla
 */
@Configuration
public class AppConfig {
    public Business getRestaurant(){
    return new Business();
    }
}
