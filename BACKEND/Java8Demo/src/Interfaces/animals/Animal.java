package Interfaces.animals;

// Interface-> Blueprint of class -->
// abstract method and static constants
//role-> Multiple inheritance achieve krna aur pure abstraction
// no constructor
// static method, default method
// interface me main method call kr skte hai
public interface Animal {
    public static final int MAX_AGE=150;

    public abstract void eat();

    void sleep();

    // static -> without object banaye call kr skte h method ko
    // static -> agar hazaro interface hai to hm static key ka use krke method bana skte jo bata dega woh interface krta kya h

    public static void info(){ //Only acces with Interface, Method ko access nhi dega call krne ke liye
        System.out.println("This is an Animal Interface");
    }

    public default void run(){ // agar 100 implemetation class hai ek interface hai to 100 me upadte na krna pde isliye default keyword dal denge
                               // aur iska class ke object bana ke access krnge
        this.eat();
        System.out.println("Animal is running");
    }
}

//abstract class vs interface
//abstract class me instance variable hote hai unko initialize krne ke liye constructor vi chahiye lekin interface me constructor nhi hote hai
//ek class sirf ek abstract class ko extends kr skti hai but ek class multiple interface ko implement kr skti hai