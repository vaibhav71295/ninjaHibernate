/**
 * Copyright (C) 2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package controllers;

import ninja.Result;
import ninja.Results;
import ninja.params.*;
import javax.persistence.*;
import com.google.inject.persist.Transactional;
import java.util.List;
import com.google.inject.Singleton;

import entity.Book;
import com.google.inject.Provider;
import com.google.inject.Inject;

@Singleton
public class ApplicationController {
	@Inject
	Provider<EntityManager> entityManagerProvider;

    public Result index() {

        return Results.html();

    }
    
    public Result helloWorldJson() {
        
        SimplePojo simplePojo = new SimplePojo();
        simplePojo.content = "Hello World! Hello Json!";

        return Results.json().render(simplePojo);

    }
    public Result getBooks()
    {
    	EntityManager entityManager = entityManagerProvider.get();
    	List<Book> book=entityManager.createQuery("from Book").getResultList();
    	return Results.json().render(book);
    }
    @Transactional
    public Result insertBook(@PathParam("id") int id,@PathParam("name") String name,@PathParam("author") String author)
    {
    	EntityManager em = entityManagerProvider.get();
    	//EntityTransaction et = em.getTransaction();
    	//et.begin();
    	String q="insert into Book values (?,?,?);";
    	em.createNativeQuery(q).setParameter(1,id).setParameter(2,name).setParameter(3,author).executeUpdate();
    	//et.commit();
    	return Results.json().render(q+name+author);
    }
    @Transactional
    public Result updateBook(@PathParam("id") int id,@PathParam("name") String name,@PathParam("author") String author)
    {
//    	EntityManager em = entityManagerProvider.get();
//    	 Book book = em.find(Book.class, id);
    	 
//    	  em.getTransaction().begin();
//    	  book.setName(name);
//    	  book.setAuthor(author);
//    	  em.getTransaction().commit();
    	EntityManager em = entityManagerProvider.get();
    	//EntityTransaction et = em.getTransaction();
    	//et.begin();
    	String q="update Book set name = '"+name+"' , author = '"+author+"' where id = '"+id+"';";
    	em.createNativeQuery(q).executeUpdate();
    	//et.commit();
    	return Results.json().render(name+author);
    }
    public Result homePage()
    {
    	return Results.html();
    }
    public static class SimplePojo {

        public String content;
        
    }
}
