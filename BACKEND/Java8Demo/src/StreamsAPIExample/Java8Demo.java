package StreamsAPIExample;

import java.util.Arrays;
import java.util.List;
import java.util.function.*;
import java.util.stream.Collectors;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Java8Demo {
    public static void main(String[] args) {

        // Streams

        // Java 8 --> minimal code, functional programming
        // Java-8 --> lambda expression, Streams, Date & Time API
        // Lambda Expression
        // Lambda expression is an anonymous function (no name, no return type, no access modifier)
        Thread t1 = new Thread(() -> {
            System.out.println("Hello World");
        });

        MathOperation sumOperation = (a, b) -> a + b;
        MathOperation subtractOperation = (a, b) -> a - b;
        int res = sumOperation.operate(1, 2);
        System.out.println(res);

        //Predicate - Functional Interface(Boolean valued function) (check krna)->condition hold
        Predicate<Integer> isEven = x -> x % 2 == 0;
        System.out.println(isEven.test(4));

        Predicate<String> isWordStartingWithA = x -> x.toLowerCase().startsWith("a");
        Predicate<String> isWordEndingWithN = x -> x.toLowerCase().endsWith("n");
        Predicate<String> and = isWordEndingWithN.and(isWordStartingWithA);
        System.out.println(and.test("Aman"));

        //Function -->Work for you
        Function<Integer,Integer> doubleIt=x->2*x;
        Function<Integer,Integer> tripleIt=x->3*x;
        System.out.println(doubleIt.andThen(tripleIt).apply(20)); //same
        System.out.println(doubleIt.compose(tripleIt).apply(20)); //same
        System.out.println(doubleIt.apply(100));
        Function<Integer,Integer>identity=Function.identity();
        System.out.println(identity.apply(5));

        //Consumer ->no return type
        Consumer<Integer>print= x->System.out.println(x);
        print.accept(51);
        List<Integer> list= Arrays.asList(1,2,3);
        Consumer<List<Integer>> printList= x->{
            for(int i:x){
                System.out.println(i);
            }
        };
        printList.accept(list);

        //Supplier-> gives nothing only take
        Supplier<String> giveHelloWorld = () -> "Hello World";
        System.out.println(giveHelloWorld.get());

        //combine example
        Predicate < Integer > predicate = x -> x % 2 == 0;
        Function<Integer, Integer> function = x -> x * x;
        Consumer<Integer> consumer = x-> System.out.println(x);
        Supplier<Integer> supplier = () -> 100;

        if(predicate.test(supplier.get())){
            consumer.accept(function.apply(supplier.get()));
        }

        //Unary,Binary Operator
        UnaryOperator<Integer> a = x-> 2* x;
        BinaryOperator<Integer> b = (x,y) -> x + y;

        //Method Reference --> use method without invoking & in place of lambda function
        List<String> students=Arrays.asList("Ram","Shyam", "GhanShyam");
        students.forEach(x -> System.out.println(x));
        students.forEach(System.out::println);//-> Method Reference-> shortcut for lambda expression

        //Construction reference
        List<String>names=Arrays.asList("A","B","C");
        List<MobilePhone> mobilePhoneList=names.stream().map(MobilePhone::new).collect(Collectors.toList());

    }
}

class MobilePhone {
    String name;

    public MobilePhone(String name) {
        this.name = name;
    }
}
interface MathOperation{
    int operate(int a,int b);
}