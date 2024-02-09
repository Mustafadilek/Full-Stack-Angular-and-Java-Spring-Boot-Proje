package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product,Long>  { // <Entity, Primary Key>
    // Behind the scenes, spring will execute a query similar to this.
    // Spring Data Rest automatically exposes endpoint --> http:// localhost:8090/api/ products/ search/ findByCategoryId?id=2
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
}
