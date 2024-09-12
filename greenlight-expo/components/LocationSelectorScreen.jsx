import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { GOOGLE_PLACES_API_KEY } from '../config';

const LocationSelectorScreen = ({ navigation }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [places, setPlaces] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    0.5 - Math.cos(dLat)/2 + 
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    (1 - Math.cos(dLon))/2;

  return R * 2 * Math.asin(Math.sqrt(a));
  };

  const convertKmToMiles = (km) => {
    return km * 0.621371;
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: coords.latitude,
        lng: coords.longitude,
      });

      // Fetch places after location is acquired
      fetchPlaces(coords.latitude, coords.longitude);
    })();
  }, []);

  const fetchPlaces = async (lat, lng, keyword = '') => {
    setLoading(true);
    const radius = 1500; // 1.5 km radius
    const type = "point_of_interest";

    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&keyword=${keyword}&key=${GOOGLE_PLACES_API_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      const placesWithDistance = response.data.results
        .map(place => {
          const distanceInKm = calculateDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng);
          const distanceInMiles = convertKmToMiles(distanceInKm);
          return { ...place, distance: distanceInMiles.toFixed(2) }; // Add distance to each place
        })
        .sort((a, b) => a.distance - b.distance); // Sort by distance

      setPlaces(placesWithDistance.slice(0, 10)); // Get the 10 nearest places
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (location.lat !== 0 && location.lng !== 0) {
      fetchPlaces(location.lat, location.lng, query);
    } else {
      alert("Location not available. Please ensure location services are enabled.");
    }
  };

  const handlePlaceClick = (place) => {
    alert(`Location set to ${place.name}`);
    navigation.navigate('NextScreen', { selectedPlace: place });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a place"
      />
      <Button title="Search" onPress={handleSearch} />

      {loading ? (
        <Text>Loading places...</Text>
      ) : (
        <FlatList
          data={places}
          keyExtractor={item => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePlaceClick(item)}>
              <View style={styles.placeContainer}>
                <Text style={styles.placeName}>{item.name}</Text>
                <Text style={styles.placeDistance}>{item.distance} miles away</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  placeContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeDistance: {
    fontSize: 14,
    color: 'gray',
  },
});

export default LocationSelectorScreen;
