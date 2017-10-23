package edu.unl.cse.weatherforecast;


import android.content.Context;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//***********************************************************************
// YOU NEED TO COMPLETE THE IMPLEMENTATIONS OF getView and LoadImageTask
//***********************************************************************

class WeatherArrayAdapter extends ArrayAdapter<Weather> {
    // class for reusing views as list items scroll off and onto the screen
    private static class ViewHolder {
        ImageView conditionImageView;
        TextView dayTextView;
        TextView lowTextView;
        TextView hiTextView;
        TextView humidityTextView;
    }

    // stores already downloaded Bitmaps for reuse
    private Map<String, Bitmap> bitmaps = new HashMap<>();

    // constructor to initialize superclass inherited members
    public WeatherArrayAdapter(Context context, List<Weather> forecast) {
        super(context, -1, forecast);
    }

    // creates the custom views for the ListView's items
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // get Weather object for this specified ListView position
        Weather day = getItem(position);

        ViewHolder viewHolder; // object that reference's list item's views

        // check for reusable ViewHolder from a ListView item that scrolled
        // offscreen; otherwise, create a new ViewHolder
        // ADD YOUR CODE HERE
        if (convertView == null) { // no reusable ViewHolder, so create one
            viewHolder = new ViewHolder();
            LayoutInflater inflater = LayoutInflater.from(getContext());
            convertView = inflater.inflate(R.layout.list_item, parent, false);
            viewHolder.conditionImageView = (ImageView) convertView.findViewById(R.id.conditionImageView);
            //you need to finish the rest
            viewHolder.dayTextView = (TextView)convertView.findViewById(R.id.dayTextView);
            viewHolder.lowTextView = (TextView)convertView.findViewById(R.id.lowTextView);
            viewHolder.hiTextView =  (TextView)convertView.findViewById(R.id.hiTextView);
            viewHolder.humidityTextView = (TextView)convertView.findViewById(R.id.humidityTextView);
            convertView.setTag(viewHolder);
        }
        else { // reuse existinf ViewHolder stores as the list item's tag
            viewHolder = (ViewHolder) convertView.getTag();
        }
//download icon in a seperate thread
        new LoadImageTask(viewHolder.conditionImageView).execute(day.iconURL);
//get other data from Weather Object and place into views
        Context context = getContext(); //for loading string resources
        viewHolder.dayTextView.setText(context.getString(
                R.string.day_description, day.dayOfWeek, day.description));
        viewHolder.humidityTextView.setText(context.getString(R.string.humidity, day.humidity));
        viewHolder.hiTextView.setText(context.getString(R.string.high_temp,day.maxTemp+(char) 0x2109));
        viewHolder.lowTextView.setText(context.getString(R.string.low_temp,day.minTemp+(char) 0x2109));
//you need to finish the rest
        // END YOUR CODE HERE
        return convertView; // return completed list item to display
    }

    // AsyncTask to load weather condition icons in a separate thread
    private class LoadImageTask extends AsyncTask<String, Void, Bitmap> {
        private ImageView imageView; // displays the thumbnail

        // store ImageView on which to set the downloaded Bitmap
        public LoadImageTask(ImageView imageView) {
            this.imageView = imageView;
        }

        // load image; params[0] is the String URL representing the image
        @Override
        protected Bitmap doInBackground(String... params) {

            Bitmap bitmap = null;
            // ADD YOUR CODE HERE

            try {
                URL url = new URL(params[0]);
//                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//                connection.setDoInput(true);
//                connection.connect();
//                InputStream input = connection.getInputStream();
//                bitmap = BitmapFactory.decodeStream(input);
//                connection.disconnect();
//                System.out.println(bitmap);
                return BitmapFactory.decodeStream(url.openConnection().getInputStream());

            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }

            // END YOUR CODE HERE
           // return null;
        }

        // set weather condition image in list item
        @Override
        protected void onPostExecute(Bitmap bitmap) {
            if (bitmap != null) {

                imageView.setImageBitmap(bitmap);
            }
        }
    }
}