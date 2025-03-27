
import React, { useCallback, useState } from "react";
// import Icon from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";

import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Linking,
  Keyboard,
  Platform,
  Modal,
  useWindowDimensions,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useChatbot } from "../../contexts/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";
import SideBarNavigation from "../../components/SideBarNavigation";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
// import AppHospitalCard from "../../components/AppHospitalCard";
import HospitalCard from "../../components/HospitalCard";
import HeaderComponenet from "../../components/HeaderComponent"
const screenWidth = Dimensions.get("window").width;
const hospitalsdata = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
  { id: "9" },
  { id: "10" },
];

const AllHospitals = ({ navigation, route }) => {
  //This is for web.......
  // const [searchQuery, setSearchQuery] = useState("");
  // const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setChatbotConfig } = useChatbot();
  const phoneNumber = "+918069991061";

  useFocusEffect(
    useCallback(() => {
      setChatbotConfig({ height: "32%" });
    }, [])
  );

  

  const [selectedMethod, setSelectedMethod] = useState("Card");
  const [country, setCountry] = useState("United States");
  const [Message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  // Emergency call button

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const [location, setLocation] = useState("");
  const [visible, setvisible] = useState(false);
  const [currlocation, setCurrLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  //For Fetching Current Location
  const getCurrLocation = async () => {
    try {
      // Request permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Permission Status:", status);

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      // Get the current location
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCurrLocation(location.coords);

      // Wait for state to update before logging
      console.log("Current Location:", location.coords);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  

  // For side buttons for to move Hospital Cards in body section for web

  const [startIndex, setStartIndex] = useState(0);

  const moveLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const moveRight = () => {
    if (startIndex < hospitalsdata.length - 3) {
      setStartIndex(startIndex + 1);
    }
  };

  // For side buttons for to move Hospital Cards in footer section for web

  const [currentIndex, setCurrentIndex] = useState(0);

  const slideLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slideRight = () => {
    if (currentIndex < hospitalsdata.length - 6) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      {(Platform.OS === "web" && screenWidth > 1000)&& (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../assets/Images/MedicineBackground.png")}
              style={styles.imageBackground}
            >
              <View
                style={[
                  styles.overlay,
                  // { backgroundColor: "rgba(13, 12, 12, 0.7)" },
                ]}
              />

              <View style={styles.parent}>
                <View style={styles.Left}>
                  <SideBarNavigation navigation={navigation} />
                </View>
                <View style={styles.Right}>
                  
                  <HeaderComponenet/>
                   
                  {/* {bodyVisible && */}
                  <View style={styles.body}>
                    <View style={styles.bodyLeft}>
                      <View style={styles.bodyheading}>
                        <Text style={styles.bodyHeadingText}>
                          Book Hospital
                        </Text>
                      </View>
                      <View style={styles.hospCards}>
                        <View style={styles.display}>
                          {/* left button to move cards */}
                          <View style={styles.leftarrow}>
                            <TouchableOpacity onPress={moveLeft}>
                              <Image
                                source={require("../../assets/Icons/LeftButton.png")}
                              />
                            </TouchableOpacity>
                          </View>
                          
                          {hospitalsdata
                            .slice(startIndex, startIndex + 3)
                            .map((hospital) => (
                              <View key={hospital.id} style={styles.box}>
                                <HospitalCard id={hospital.id}  navigation={navigation}/>
                                {/* <Text>Hello</Text> */}
                              </View>
                            ))}
                          {/* Right button to move cards */}

                          <View style={styles.rightarrow}>
                            <TouchableOpacity
                              onPress={moveRight}
                              activeOpacity={0.7}
                            >
                              <Image
                                source={require("../../assets/Icons/RightButton.png")}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>

                        
                      </View>
                    </View>

                    {/* Emergency Card */}

                    <View style={styles.bodyRight}>
                      <View style={styles.emergencyCardContainer}>
                        <View style={styles.emergencyCard}>
                          <TouchableOpacity
                            onPress={handleCallPress}
                            style={styles.iconContainer}
                          >
                            <MaterialIcons
                              name="call"
                              size={24}
                              color="red"
                              style={styles.callIcon}
                            />
                          </TouchableOpacity>
                          <Text style={styles.headingEmergencyCard}>
                            Emergency
                          </Text>
                          <Text style={styles.description}>
                            Get Immediate Help Now
                          </Text>
                          <Text>Find the Nearest Hospital</Text>
                          <Text>& Book Instantly</Text>

                          {/* Button to book hospital */}

                          <TouchableOpacity
                            style={styles.EmergenecyButtonContainer}
                            onPress={() => {
                              setvisible(true);
                            }}
                          >
                            <Text style={styles.EmergenecyButton}>
                              Book Hospital Instantly
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  {/* } */}
                  {/* Screen visible when we click on book hospital Instantly */}
                  <Modal
                    visible={visible}
                    animationType="slide"
                    transparent={true}
                  >
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalContainerHeading}>
                        Hospital Booking
                      </Text>
                      <View style={styles.modalContent}>
                        <View style={styles.modelHeader}>
                          <Text style={styles.modalText}>
                            Look Like its an Emergency!!
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              setvisible(false);
                            }}
                            style={styles.modalButton}
                          >
                            <MaterialIcons
                              name="clear"
                              size={24}
                              color="black"
                              style={styles.clearIcon}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.locationContainer}>
                          <View style={styles.locationinput}>
                            <MaterialIcons
                              name="location-on"
                              size={24}
                              color="black"
                              style={styles.currentLocationIcon}
                            />
                            <TextInput
                              style={styles.inputlocation}
                              placeholder="Enter your location"
                              placeholderTextColor="#aaa"
                              value={currlocation}
                              onChangeText={setLocation}
                            />
                          </View>
                          <View style={styles.currentLocation}>
                            <TouchableOpacity
                              style={styles.locationButton}
                              onPress={getCurrLocation}
                              disabled={loading}
                            >
                             
                              <Text style={styles.buttonText}>
                                Use Current Location
                              </Text>

                             
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  {/* Footer section where hospital cards are displayed */}
                  <View style={styles.footer}>
                    <View style={styles.footerBody}>
                      <View style={styles.display1}>
                        <View style={styles.leftarrow}>
                          <TouchableOpacity onPress={slideLeft}>
                            <Image
                              source={require("../../assets/Icons/LeftButton.png")}
                            />
                          </TouchableOpacity>
                        </View>

                        {hospitalsdata
                          .slice(currentIndex, currentIndex + 6)
                          .map((hospital) => (
                            <View key={hospital.id} style={styles.box1}>
                              <HospitalCard id={hospital.id} />
                              {/* <Text>Hello</Text> */}
                            </View>
                          ))}
                        <View style={styles.rightarrow}>
                          <TouchableOpacity
                            onPress={slideRight}
                            activeOpacity={0.7}
                          >
                            <Image
                              source={require("../../assets/Icons/RightButton.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      )}

      {/* .......for mobile  */}

      {(Platform.OS !== "web" && screenWidth < 1000) && (
        <View style={styles.appContainer}>
          <View style={styles.headContainer}>
            <Header navigation={navigation} />
          </View>
          <View style={styles.searchBarConatiner}>
            {/* <View style={styles.headingContainer}>
              <Text style={styles.heading}>Hello Alex! </Text>
            </View> */}
            <SearchBar style={styles.searchinput} />
          </View>
          <View style={styles.appbody}>
            

            {/* flatlist is used to display card  */}

            
            <FlatList
              style={styles.flatListConatainer}
              data={hospitalsdata}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
              
                <HospitalCard id={item.id} navigation={navigation} />
              )}
              contentContainerStyle={{ gap: 10 }}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.Phoneicon}>
            <TouchableOpacity
              onPress={() => navigation.navigate("EmergencyLocation")}
            >
              <Image
                style={styles.phoneimage}
                source={require("../../assets/Icons/phone.png")}
              />
              <Text style={styles.phoneiconText}>Emergency</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
};
const styles = StyleSheet.create({
  //........APP design starts

  appContainer: {
     height: "100%",
     width: "100%",
  },
  headContainer: {
    height: "14%",
    width: "100%",
    justifyContent: "center",
    paddingTop: "8%",
  },
  searchBarConatiner: {
    height: "8%",
    width: "100%",
    gap: 10,
  },
  headingContainer: {
    width: "100%",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    paddingLeft: "6%",
  },
  appbody: {
    height: "78%",
    width: "90%",
    marginLeft: "5%",
    alignItems: "center",
    gap: 5,
  },
  flatListConatainer: {
    height: "30%",
  },
  Phoneicon: {
    justifyContent: "center",
    position: "absolute",
    bottom: 18,
    right: 180,
    backgroundColor: "#990000",
    padding: "3%",
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  phoneimage: {
    paddingLeft: "1%",
  },
  phoneiconText: {
    fontSize: 8,
    color: "#fff",
    paddingTop: "1%",
  },
  // ...........App design ends

  //............web design start

  container: {
    // flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    // borderWidth: 1,
    // borderColor: "#ff0000",
  },
  imageBackground: {
    // flex: 1,
    height: "100%",
    width: "100%",
    borderWidth: 1,
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  Left: {
    height: "100%",
    width: "15%",
    borderWidth: 1,
  },
  Right: {
    height: "100%",
    width: "85%",
    gap: 2,
  },
  // header: {
  //   height: "10%",
  //   width: "100%",
  //   alignContent:"center",
  //   // justifyContent:"center",
  //   // marginTop: "2%",
  //   //marginLeft: "2%",
  //   // backgroundColor: "#fff",
  //   // borderColor:"red",
  //   // borderWidth:"2px",
  // },
  body: {
    height: "30%",
    width: "100%",
    marginLeft: "2%",
    flexDirection: "row",
    gap: 10,
  },
  bodyLeft: {
    width: "50%",
    height: "100%",

    // gap: "2%",
    // borderColor:"red",
    // borderWidth:"2px",
  },
  bodyheading: {
    height: "8%",
    width: "100%",
    // borderColor:"red",
    // borderWidth:"2px",
  },

  bodyHeadingText: {
    fontSize: 20,
    color: "#fff",
  },
  hospCards: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:"flex-end",
  },

  display: {
    height: "90%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // alignItems: "center",
    // overflow: "hidden",
  },
  leftarrow: {
    height: "100%",
    width: "5%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  rightarrow: {
    height: "100%",
    width: "5%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  box: {
    // flex: 1,
    height: "90%",
    width: "26%",
    justifyContent: "center",
    // marginHorizontal: 10,
    // flexShrink: 0,
  },

  bodyRight: {
    width: "25%",
    height: "100%",
    alignItems: "flex-end",
  },
  emergencyCardContainer: {
    width: "70%",
    height: "80%",
    marginLeft: "20%",
    paddingTop: "5%",
    paddingBottom: "20%",
    borderWidth: 2,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  emergencyCard: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingBottom: "10%",
    marginLeft: "4%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#fdecea",
  },
  callIcon: {
    alignSelf: "center",
  },
  headingEmergencyCard: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FF7072",
  },
  description: {
    fontWeight: "bold",
  },
  EmergenecyButtonContainer: {
    marginTop: "5%",
    backgroundColor: "#FF7072",
    padding: "2%",
    borderRadius: 5,
  },
  EmergenecyButton: {
    color: "#fff",
  },

  modalContainer: {
    height: "100%",
    width: "100%",
    marginLeft: "14.9%",
    paddingTop: "10%",
    // paddingRight:"20%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: 1,
  },
  modalContainerHeading: {
    fontSize: 34,

    color: "#fff",
    marginRight: "45%",
    marginLeft: "5%",
  },

  modalContent: {
    width: "40%",
    height: "35%",
    marginLeft: "15%",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    borderRadius: 5,
    shadowOffset: 10,
  },
  modelHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalText: {
    width: "100%",
    height: "25%",
    textAlign: "center",
    justifyContent: "center",
    marginTop: "5%",
    fontSize: 20,
    fontWeight: "bold",
  },
  locationContainer: {
    height: "75%",
    width: "100%",
    gap: 5,
  },
  locationinput: {
    marginTop: "5%",
    width: "80%",
    height: "25%",
    // padding:"10%",
    marginLeft: "10%",
    marginRight: "10%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    backgroundColor: "white",
  },
  currentLocationIcon: {
    marginRight: 10,
  },
  inputlocation: {
    fontSize: 14,
    color: "black",
    // justifyContent:"center",
    alignItems: "center",
    padding: "1%",
    outlineStyle: "none",
  },
  currentLocation: {
    flexDirection: "row",
    width: "40%",
    height: "20%",
     alignItems: "center",
    justifyContent: "center",
    marginLeft: "30%",
    borderWidth: 1,
    borderColor: "#black",
    borderRadius: 8,
  },
  buttonText:{
   paddingTop:"2%",
  },

  footer: {
    height: "35%",
    width: "100%",
    marginLeft: "2%",
  },
  footerBody: {
    height: "90%",
    //flex:1,
    width: "90%",
    flexDirection: "row",
    // justifyContent: "space-evenly",
    // alignItems: "center",
  },

  display1: {
    height: "90%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box1: {
    height: "90%",
    width: "18%",
    justifyContent: "center",
  },
});
export default AllHospitals;
