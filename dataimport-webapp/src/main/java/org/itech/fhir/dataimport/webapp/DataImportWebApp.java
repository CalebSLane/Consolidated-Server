package org.itech.fhir.dataimport.webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
@EnableAsync
@EnableJpaRepositories("org.itech")
@EntityScan("org.itech")
@ComponentScan("org.itech")
@PropertySource(value = { "classpath:application.properties" })
public class DataImportWebApp {

	public static void main(String[] args) {
		SpringApplication.run(DataImportWebApp.class, args);
	}

}
