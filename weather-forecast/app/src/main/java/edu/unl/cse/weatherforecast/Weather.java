package edu.unl.cse.weatherforecast;


import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.TimeZone;

class Weather {
    public final String dayOfWeek;
    public final String minTemp;
    public final String maxTemp;
    public final String humidity;
    public final String description;
    public final String iconURL;

    // constructor
    public Weather(long timeStamp, double minTemp, double maxTemp,
                   double humidity, String description, String iconName) {
        // NumberFormat to format double temperatures rounded to integers
        // ADD YOUR CODE HERE
        this.dayOfWeek = convertTimeStampToDay(timeStamp);
        this.minTemp = NumberFormat.getIntegerInstance().format(minTemp);
        this.maxTemp = NumberFormat.getIntegerInstance().format(maxTemp);
        this.humidity = NumberFormat.getPercentInstance().format(humidity/100);
        this.description = description;
        this.iconURL = "http://api.openweathermap.org/img/w/"+iconName;
        // END YOUR CODE HERE
    }

    // convert timestamp to a day's name (e.g., Monday, Tuesday, ...)
    private static String convertTimeStampToDay(long timeStamp) {
        // notice that the dt field returned by the web service is
        // the number of seconds that have taken place since January 1st, 1970 GMT
        // to perform the conversion, you need to do the following:
        // 1 create a Calendar object
        Calendar calendar = Calendar.getInstance(); // create Calendar
        // convert the incoming timeStamp (in seconds) to milliseconds (*1000)
        calendar.setTimeInMillis(timeStamp * 1000); // set time
        // get the timezone on the running device
        TimeZone tz = TimeZone.getDefault(); // get device's time zone

        // adjust time for device's time zone by adding or subtracting milliseconds
        calendar.add(Calendar.MILLISECOND,
                tz.getOffset(calendar.getTimeInMillis()));

        // SimpleDateFormat that returns the day's name
        SimpleDateFormat dateFormatter = new SimpleDateFormat("EEEE");
        return dateFormatter.format(calendar.getTime());
    }
}