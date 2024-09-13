<?php

    define("fruits", array(
        'dog',
        'cat',
        'bird'
    ));
    
    echo fruits[1];
    // fruits[1] = "kuda";
    // Membuat array
    $fruits = ['apple', 'gedang'];
    
    // Menampilkan array
    print_r($fruits);
    
    // Akses elemen array
    echo $fruits[1] . "\n";
    
    // Manipulasi array
    $fruits[1] = "janz";
    
    // Menampilkan array setelah manipulasi
    print_r($fruits);
    ?>