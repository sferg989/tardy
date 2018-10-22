<?php
/**
 * Created by PhpStorm.
 * User: steve
 * Date: 10/22/18
 * Time: 8:54 AM
 */
function array_debug($my_array,$return_as_var=false)
{
    /*
    print "count=".count($my_array)."<br>";
    $i=0;
    while($i < count($my_array))
    {
        print "$i " .$my_array[$i] . "<br>";
        $i++;
    }
    */
    if($return_as_var)
    {
        $z = "<pre>";
        $z .= print_r($my_array,true);
        $z .= "</pre>";
        return $z;
    }
    else
    {
        print "<pre>";
        print_r($my_array);
        print "</pre>";
    }
    return true;
}

$names_copy = array();
$pairings = array();
$names = array();
$other_exclusions = array();
$other_exclusions["sib 1"][] ="sib 4";
$other_exclusions["sib 1"][] ="sib 5";
$other_exclusions["sib 1"][] ="sib 6";
$other_exclusions["sib 2"][] ="sib 4";
/*
$other_exclusions["sib 1"][] ="sib 5";
$other_exclusions["sib 1"][] ="sib 6";*/
$names[] = "sib 1";
$names[] = "sib 2";
$names[] = "sib 3";
$names[] = "sib 4";
$names[] = "sib 5";
$names[] = "sib 6";
$names[] = "sib 7";
$names[] = "sib 8";
$names[] = "sib 9";
$names[] = "sib 10";
$names[] = "sib 11";
$names[] = "sib 12";
$names[] = "sib 13";
$names[] = "sib 14";
$names[] = "sib 15";
$names[] = "sib 16";

$names_copy = $names;
//array_debug($names_copy);
//die();

function determinePartner($key, $value,$names_copy,$other_exclusions){
    $exclusions_keys =array_keys($other_exclusions);
    $exclusion_list = $names_copy;
    //array_debug($exclusions_keys);
    //there are secondary exclusions because the person we are pairing has
    //requested not to be with certain people;
    if(in_array($value, $exclusions_keys)){

        //print "this is Exclusion $value";
        foreach ($other_exclusions[$value] as $not_this_person){
            $other_people2_remove_key = array_search($not_this_person,$exclusion_list);
            unset($exclusion_list[$other_people2_remove_key]);
            //print "$value does not want $not_this_person";

        }
    }
    /*foreach ($exclusions_keys as $key){
        if($value ==$key){
            print "this is Exclusion $value";
        }
    }*/


    $random_key = array_rand($exclusion_list);
    while($key == $random_key){
        $random_key = array_rand($exclusion_list);
    }


    return $random_key;
}


foreach ($names as $key=>$value){

    $random_key = determinePartner($key, $value,$names_copy,$other_exclusions);
    print $value." Paired with ".$names[$random_key]."<br>";
    unset($names_copy[$random_key]);

}
