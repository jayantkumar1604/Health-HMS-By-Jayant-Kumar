package Interfaces.animals;

public class Test {
    public static void main(String[] args) {
        Dog dog = new Dog();
        Cat cat = new Cat();
        dog.eat();
        System.out.println(Dog.MAX_AGE);
        System.out.println(Animal.MAX_AGE);
        Animal.info();
        cat.run();
        dog.run();
    }
}
