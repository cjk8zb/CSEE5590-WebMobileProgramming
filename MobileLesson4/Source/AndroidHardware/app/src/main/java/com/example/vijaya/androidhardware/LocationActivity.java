package com.example.vijaya.androidhardware;

import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.tasks.OnSuccessListener;

import java.util.List;

public class LocationActivity extends AppCompatActivity implements OnMapReadyCallback {
    private GoogleMap mMap;
    public Geocoder geocoder;
    double latitude = 0, longitude = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_location);
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        geocoder = new Geocoder(this);
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED && ActivityCompat
                .checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            //show message or ask permissions from the user.
            ActivityCompat.requestPermissions(this, new String[]{
                    android.Manifest.permission.ACCESS_FINE_LOCATION,
                    android.Manifest.permission.ACCESS_COARSE_LOCATION}, 0);
            return;
        }

        //Getting the current location of the user.

        // ICP Task1: Write the code to get the current location of the user
        final Context context = this;
        FusedLocationProviderClient client = LocationServices.getFusedLocationProviderClient(this);
        client.getLastLocation().addOnSuccessListener(this, new OnSuccessListener<Location>() {
            @Override
            public void onSuccess(final Location location) {
                StringBuilder userAddress = new StringBuilder();

                LatLng userCurrentLocationCorodinates = null;
                double latitute = 0, longitude = 0;
                latitute = location.getLatitude();
                longitude = location.getLongitude();
                userCurrentLocationCorodinates = new LatLng(latitute, longitude);
                //Getting the address of the user based on latitude and longitude.
                try {
                    List<Address> addresses = geocoder.getFromLocation(latitute, longitude, 1);
                    String city = addresses.get(0).getLocality();
                    String state = addresses.get(0).getAdminArea();
                    String country = addresses.get(0).getCountryName();
                    String postalCode = addresses.get(0).getPostalCode();
                    String knownName = addresses.get(0).getFeatureName();

                    userAddress
                            .append(knownName).append(", ")
                            .append(city).append(", ")
                            .append(state).append(", ")
                            .append(country).append(" ")
                            .append(postalCode).append("\t");

                    Toast.makeText(context, " " + userAddress, Toast.LENGTH_SHORT).show();
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                //Setting our image as the marker icon.
                mMap.addMarker(new MarkerOptions().position(userCurrentLocationCorodinates)
                        .title("Your current address.").snippet(userAddress.toString())
                        .icon(BitmapDescriptorFactory.fromResource(R.drawable.marker_maps)));
                //Setting the zoom level of the map.
                mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(userCurrentLocationCorodinates, 7));
            }
        });

    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {
    }
}
