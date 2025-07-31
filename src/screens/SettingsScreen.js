import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import defaultStyle from "../styles/defaultStyle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";
import InfoApp from "../components/InfoApp";
import MobileOnlyView from "../components/MobileOnlyView";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import translations from "../utils/translations";
import pkg from "../../package.json";
import { useNavigation } from "@react-navigation/native";

// Social links array: ogni oggetto rappresenta un social con icona e url
const SOCIAL_LINKS = [
  {
    id: 1,
    url: "https://www.instagram.com/federicolupolii/",
    label: "instagram",
  },
  { id: 2, url: "https://www.github.com/FedericoLupoli/", label: "github" },
  {
    id: 3,
    url: "https://www.linkedin.com/in/federico-lupoli-548791286/",
    label: "linkedin",
  },
  { id: 4, url: "https://www.federicolupoli.it/knowby/", label: "google" },
];

export default function SettingsScreen() {
  // Stato lingua globale
  const { language, toggleLanguage } = useLanguage();
  // Stato per tracciare quale icona è attiva nel footer
  const [activeIcon, setActiveIcon] = useState("settings");

  const { logout, user } = useAuth();
  const navigation = useNavigation();

  // Redirect automatico se non autenticato
  React.useEffect(() => {
    if (!user) {
      navigation.replace("ProfileLogin");
    }
  }, [user, navigation]);

  // Funzione per gestire il logout (ora funzionante)
  const handleLogout = async () => {
    await logout();
    alert(translations[language].settings.logoutSuccess);
    // Naviga alla schermata di login
    if (navigation && navigation.replace) {
      navigation.replace("ProfileLogin");
    }
  };

  return (
    <MobileOnlyView>
      <View style={defaultStyle.container}>
        {/* Header */}
        <Header />

        {/* Body delle impostazioni */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
            marginTop: -75,
          }}
        >
          {/* Sezione Lingua */}
          <View style={defaultStyle.section}>
            <Text style={defaultStyle.label}>
              <FontAwesome name="language" size={28} />{" "}
              {translations[language].settings.language}
              <Text style={defaultStyle.blue}>
                {translations[language].settings.currentLanguage}
              </Text>
            </Text>
            <View style={defaultStyle.row}>
              <Text style={defaultStyle.text}>
                {translations[language].settings.currentLanguage}
              </Text>
              <TouchableOpacity
                style={defaultStyle.buttonFooter}
                onPress={toggleLanguage}
              >
                <Text style={defaultStyle.buttonFooterText}>
                  {translations[language].settings.changeLanguage}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sezione Account/Logout */}
          <View style={defaultStyle.section}>
            <Text style={defaultStyle.label}>
              <FontAwesome name="user" size={28} />{" "}
              {translations[language].settings.account}
            </Text>
            <TouchableOpacity
              style={[
                defaultStyle.buttonFooter,
                { backgroundColor: "#d32f2f" },
              ]}
              onPress={handleLogout}
            >
              <Text
                style={[
                  defaultStyle.buttonFooterText,
                  { color: "#fff", textAlign: "center" },
                ]}
              >
                {translations[language].settings.logout}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sezione Social */}
          <View style={defaultStyle.section}>
            <Text style={defaultStyle.label}>
              <FontAwesome name="share" size={28} />{" "}
              {translations[language].settings.social}
            </Text>
            <SocialLinks socialLinks={SOCIAL_LINKS} />
          </View>

          {/* Sezione Info App */}
          <InfoApp
            version={pkg.version}
            label={translations[language].infoApp.label}
          />
        </View>

        {/* Footer */}
        <Footer activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
      </View>
    </MobileOnlyView>
  );
}
