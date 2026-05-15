package stream;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class TerminalOps {
    public static void main(String[] args) {

        List<Integer>list= Arrays.asList(1,2,3);

        //1. collect
        System.out.println(list.stream().skip(1).collect(Collectors.toList()));
        System.out.println(list.stream().skip(1).toList());

        //2 .ForEach
        list.stream().forEach(x-> System.out.println(x));

        //3. reduce : Combines elements to produce a single result
        Optional<Integer>optionalInteger= list.stream().reduce(Integer::sum);
        System.out.println(optionalInteger.get());

        //4. count


        //5. anyMatch,allMatch,noneMatch -> short-circuit

        boolean b=list.stream().anyMatch(x-> x%2==0);
        System.out.println(b);
        boolean b1=list.stream().allMatch(x->x>0);
        System.out.println(b1);
        boolean b2=list.stream().noneMatch(x->x<0);
        System.out.println(b2);

        //6. findFirst, findAny
        System.out.println(list.stream().findFirst().get());
        System.out.println(list.stream().findAny().get());

        //7. toArray()

        Object[] array= Stream.of(1,2,3).toArray();

        //8. min/max
        System.out.println("max: "+ Stream.of(2,44,69).max((o1,o2)->o2-o1));
        System.out.println("max: "+ Stream.of(2,44,69).min(Comparator.naturalOrder()));

        // 0. ForEachOrdered
        List<Integer> numbers0=Arrays.asList(1,2,3,4,5,6,7,8,9,10);
        System.out.println("Using forEach with Parallel stream:");
        numbers0.parallelStream().forEach(System.out::println);
        System.out.println("Using forEachOrdered with Parallel stream:");
        numbers0.parallelStream().forEachOrdered(System.out::println);

        //Example
        List<String>names= Arrays.asList("Anna","Bob", "Charlie","David");
        List<String> res=names.stream().filter(x->x.length()>3).toList();
        System.out.println(res);

        //Example: Squaring and Sorting Numbers
        List<Integer> numbers= Arrays.asList(5,2,9,1,6);
        System.out.println(numbers.stream().sorted().map(x->x*x).toList());

        //Example: Summing Values
        List<Integer> integers=Arrays.asList(1,2,3,4,5);
        System.out.println(integers.stream().reduce(Integer::sum).get());

        //Example: Counting Occurrences of Character
        String sentence="Hello World!";
        System.out.println(sentence.chars().filter(x->x=='l').count());

        // Example
        // Streams cannot be used after a terminal operation has been called
        Stream<String> stream=names.stream();
        stream.forEach(System.out::println);
//      List<String> list1= stream.map(String::toUpperCase).toList(); // exception

        // stateful-> sort & stateless->map agal bagal se koi matlb nhi

    }
}
