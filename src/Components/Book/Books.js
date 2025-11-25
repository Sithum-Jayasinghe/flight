// src/components/Books/Books.js
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Paper,
  Grid,
  Divider,
  Chip,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import BookForm from "./BookForm";
import BooksTable from "./BooksTable";
import Axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Main/Header";
import InsightsIcon from "@mui/icons-material/Insights";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import WorkIcon from "@mui/icons-material/Work";
import FlightIcon from "@mui/icons-material/Flight";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import ChatIcon from "@mui/icons-material/Chat";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LanguageIcon from "@mui/icons-material/Language";
import TranslateIcon from "@mui/icons-material/Translate";

// 🌍 Multi-language translations
const translations = {
  en: {
    // Navigation & Titles
    title: "✈️ AI-Powered Flight Booking System",
    dashboard: "Dashboard",
    bookings: "Bookings",
    priceAlerts: "Price Alerts",
    flightStatus: "Flight Status",
    darkMode: "Dark Mode",
    live: "LIVE",
    refresh: "Refresh real-time data",
    aiAssistant: "AI Assistant",
    
    // Real-time Updates
    realTimeUpdates: "Real-Time Updates",
    updates: {
      baggagePromo: "Extra baggage promotion: 25% off this week",
      securityMeasures: "New security measures implemented at major airports",
      lastMinuteDeals: "Last minute deals available for weekend flights",
      loyaltyBonus: "Loyalty points bonus: Double points on all bookings this month",
      weatherAlert: "Weather alert may affect flights in Northeast region"
    },
    
    // Sections
    popularRoutes: "🌍 Popular Routes",
    smartRecommendations: "Smart Recommendations",
    from: "From",
    
    // Recommendations
    recommendations: {
      bestTime: "Best Time",
      bestTimeMsg: "Book flights 6–8 weeks early to unlock fares from {{price}}.",
      upgrade: "Upgrade",
      upgradeMsg: "Business Class upgrades from {{price}} - 20% cheaper this week.",
      baggage: "Baggage",
      baggageMsg: "Extra baggage {{price}} if purchased during booking.",
      specialOffer: "Special Offer",
      specialOfferMsg: "Colombo to Mumbai: {{oldPrice}} → {{newPrice}}"
    },
    
    // Price Alerts
    priceAlertsTitle: "🚨 Price Alerts",
    
    // Flight Status
    flightStatusTitle: "📊 Flight Status",
    departure: "Departure",
    arrival: "Arrival",
    gate: "Gate",
    status: {
      onTime: "On Time",
      delayed: "Delayed",
      boarding: "Boarding",
      departed: "Departed"
    },
    
    // AI Chat
    aiTravelAssistant: "AI Travel Assistant (Voice Enabled)",
    chatPlaceholder: "Ask about flights, prices, or recommendations...",
    closeChat: "Close chat",
    
    // AI Responses
    aiResponses: {
      booking: "You can easily create or update your bookings in the 'Bookings' tab. Would you like me to guide you there?",
      price: "Right now, Colombo to Mumbai is priced around {{price}}. We also have discounts up to 15% for early bookings!",
      status: "Your flights are mostly on time today ✈️. The next departures from Colombo are at 10:15 AM and 4:20 PM.",
      weather: "The weather in Colombo is sunny ☀️, about 30°C. Perfect for flying!",
      baggage: "You can carry 30 kg of checked baggage and 7 kg as hand luggage. Don't forget to check in online 24 hours before departure!",
      time: "Most flights leave Colombo between 8:00 AM and 10:00 PM daily. Which route would you like to check?",
      route: "Flights between Colombo and your destination operate daily. The average price is around {{price}}.",
      greeting: "Hi there 👋! I'm your AI travel assistant. You can ask about bookings, prices, baggage, or flight status.",
      payment: "You can pay using Visa, MasterCard, or online banking. Refunds are processed within 3–5 business days after cancellation.",
      advice: "Travel Tip 🌍: Booking 6–8 weeks early usually gives you the lowest fare. Also, Tuesdays and Wednesdays tend to have cheaper flights!",
      fallback: "I didn't quite catch that — could you please rephrase?"
    }
  },
  
  es: {
    // Spanish
    title: "✈️ Sistema de Reserva de Vuelos con IA",
    dashboard: "Panel",
    bookings: "Reservas",
    priceAlerts: "Alertas de Precio",
    flightStatus: "Estado de Vuelos",
    darkMode: "Modo Oscuro",
    live: "EN VIVO",
    refresh: "Actualizar datos en tiempo real",
    aiAssistant: "Asistente IA",
    
    realTimeUpdates: "Actualizaciones en Tiempo Real",
    updates: {
      baggagePromo: "Promoción de equipaje extra: 25% de descuento esta semana",
      securityMeasures: "Nuevas medidas de seguridad implementadas en aeropuertos principales",
      lastMinuteDeals: "Ofertas de última hora disponibles para vuelos de fin de semana",
      loyaltyBonus: "Bonificación de puntos de fidelidad: Doble puntos en todas las reservas este mes",
      weatherAlert: "Alerta meteorológica puede afectar vuelos en la región Noreste"
    },
    
    popularRoutes: "🌍 Rutas Populares",
    smartRecommendations: "Recomendaciones Inteligentes",
    from: "Desde",
    
    recommendations: {
      bestTime: "Mejor Momento",
      bestTimeMsg: "Reserva vuelos 6-8 semanas antes para obtener tarifas desde {{price}}.",
      upgrade: "Mejora",
      upgradeMsg: "Mejoras a Business Class desde {{price}} - 20% más barato esta semana.",
      baggage: "Equipaje",
      baggageMsg: "Equipaje extra {{price}} si se compra durante la reserva.",
      specialOffer: "Oferta Especial",
      specialOfferMsg: "Colombo a Mumbai: {{oldPrice}} → {{newPrice}}"
    },
    
    priceAlertsTitle: "🚨 Alertas de Precio",
    
    flightStatusTitle: "📊 Estado de Vuelos",
    departure: "Salida",
    arrival: "Llegada",
    gate: "Puerta",
    status: {
      onTime: "A Tiempo",
      delayed: "Retrasado",
      boarding: "Abordando",
      departed: "Salido"
    },
    
    aiTravelAssistant: "Asistente de Viajes IA (Con Voz)",
    chatPlaceholder: "Pregunta sobre vuelos, precios o recomendaciones...",
    closeChat: "Cerrar chat",
    
    aiResponses: {
      booking: "Puedes crear o actualizar tus reservas fácilmente en la pestaña 'Reservas'. ¿Te gustaría que te guíe allí?",
      price: "Actualmente, Colombo a Mumbai tiene un precio alrededor de {{price}}. ¡También tenemos descuentos de hasta 15% para reservas anticipadas!",
      status: "Tus vuelos están mayormente a tiempo hoy ✈️. Las próximas salidas de Colombo son a las 10:15 AM y 4:20 PM.",
      weather: "El clima en Colombo es soleado ☀️, alrededor de 30°C. ¡Perfecto para volar!",
      baggage: "Puedes llevar 30 kg de equipaje facturado y 7 kg como equipaje de mano. ¡No olvides hacer el check-in online 24 horas antes de la salida!",
      time: "La mayoría de los vuelos salen de Colombo entre las 8:00 AM y las 10:00 PM diariamente. ¿Qué ruta te gustaría consultar?",
      route: "Los vuelos entre Colombo y tu destino operan diariamente. El precio promedio es alrededor de {{price}}.",
      greeting: "¡Hola 👋! Soy tu asistente de viajes IA. Puedes preguntarme sobre reservas, precios, equipaje o estado de vuelos.",
      payment: "Puedes pagar usando Visa, MasterCard o banca online. Los reembolsos se procesan dentro de 3-5 días hábiles después de la cancelación.",
      advice: "Consejo de Viaje 🌍: Reservar 6-8 semanas antes usualmente te da la tarifa más baja. ¡También los martes y miércoles tienden a tener vuelos más baratos!",
      fallback: "No entendí completamente — ¿podrías reformular por favor?"
    }
  },
  
  fr: {
    // French
    title: "✈️ Système de Réservation de Vols avec IA",
    dashboard: "Tableau de Bord",
    bookings: "Réservations",
    priceAlerts: "Alertes de Prix",
    flightStatus: "Statut des Vols",
    darkMode: "Mode Sombre",
    live: "EN DIRECT",
    refresh: "Actualiser les données en temps réel",
    aiAssistant: "Assistant IA",
    
    realTimeUpdates: "Mises à Jour en Temps Réel",
    updates: {
      baggagePromo: "Promotion bagage supplémentaire: 25% de réduction cette semaine",
      securityMeasures: "Nouvelles mesures de sécurité implémentées dans les grands aéroports",
      lastMinuteDeals: "Dernières offres disponibles pour les vols de week-end",
      loyaltyBonus: "Bonus de points fidélité: Double points sur toutes les réservations ce mois-ci",
      weatherAlert: "Alerte météo peut affecter les vols dans la région Nord-Est"
    },
    
    popularRoutes: "🌍 Routes Populaires",
    smartRecommendations: "Recommandations Intelligentes",
    from: "De",
    
    recommendations: {
      bestTime: "Meilleur Moment",
      bestTimeMsg: "Réservez les vols 6-8 semaines à l'avance pour obtenir des tarifs à partir de {{price}}.",
      upgrade: "Amélioration",
      upgradeMsg: "Améliorations en Business Class à partir de {{price}} - 20% moins cher cette semaine.",
      baggage: "Bagage",
      baggageMsg: "Bagage supplémentaire {{price}} si acheté pendant la réservation.",
      specialOffer: "Offre Spéciale",
      specialOfferMsg: "Colombo à Mumbai: {{oldPrice}} → {{newPrice}}"
    },
    
    priceAlertsTitle: "🚨 Alertes de Prix",
    
    flightStatusTitle: "📊 Statut des Vols",
    departure: "Départ",
    arrival: "Arrivée",
    gate: "Porte",
    status: {
      onTime: "À l'Heure",
      delayed: "Retardé",
      boarding: "Embarquement",
      departed: "Décollé"
    },
    
    aiTravelAssistant: "Assistant de Voyage IA (Avec Voix)",
    chatPlaceholder: "Demandez sur les vols, prix ou recommandations...",
    closeChat: "Fermer le chat",
    
    aiResponses: {
      booking: "Vous pouvez facilement créer ou mettre à jour vos réservations dans l'onglet 'Réservations'. Voulez-vous que je vous y guide?",
      price: "Actuellement, Colombo à Mumbai est prix autour de {{price}}. Nous avons aussi des remises jusqu'à 15% pour les réservations anticipées!",
      status: "Vos vols sont majoritairement à l'heure aujourd'hui ✈️. Les prochains départs de Colombo sont à 10h15 et 16h20.",
      weather: "Le temps à Colombo est ensoleillé ☀️, environ 30°C. Parfait pour voler!",
      baggage: "Vous pouvez transporter 30 kg de bagages en soute et 7 kg comme bagage à main. N'oubliez pas de faire l'enregistrement en ligne 24 heures avant le départ!",
      time: "La plupart des vols quittent Colombo entre 8h00 et 22h00 quotidiennement. Quelle route aimeriez-vous vérifier?",
      route: "Les vols entre Colombo et votre destination opèrent quotidiennement. Le prix moyen est autour de {{price}}.",
      greeting: "Salut 👋! Je suis votre assistant de voyage IA. Vous pouvez me demander sur les réservations, prix, bagages ou statut des vols.",
      payment: "Vous pouvez payer en utilisant Visa, MasterCard ou banque en ligne. Les remboursements sont traités dans les 3-5 jours ouvrables après l'annulation.",
      advice: "Conseil de Voyage 🌍: Réserver 6-8 semaines à l'avance vous donne généralement le tarif le plus bas. Aussi, les mardis et mercredis ont tendance à avoir des vols moins chers!",
      fallback: "Je n'ai pas bien compris — pourriez-vous reformuler s'il vous plaît?"
    }
  },
  
  de: {
    // German
    title: "✈️ KI-gestütztes Flugbuchungssystem",
    dashboard: "Dashboard",
    bookings: "Buchungen",
    priceAlerts: "Preisalarme",
    flightStatus: "Flugstatus",
    darkMode: "Dunkelmodus",
    live: "LIVE",
    refresh: "Echtzeitdaten aktualisieren",
    aiAssistant: "KI-Assistent",
    
    realTimeUpdates: "Echtzeit-Updates",
    updates: {
      baggagePromo: "Zusatzgepäck-Aktion: 25% Rabatt diese Woche",
      securityMeasures: "Neue Sicherheitsmaßnahmen an großen Flughäfen implementiert",
      lastMinuteDeals: "Last-Minute-Angebote für Wochenendflüge verfügbar",
      loyaltyBonus: "Treuepunkte-Bonus: Doppelte Punkte bei allen Buchungen diesen Monat",
      weatherAlert: "Wetterwarnung kann Flüge in der Nordost-Region beeinflussen"
    },
    
    popularRoutes: "🌍 Beliebte Routen",
    smartRecommendations: "Intelligente Empfehlungen",
    from: "Ab",
    
    recommendations: {
      bestTime: "Beste Zeit",
      bestTimeMsg: "Buchen Sie Flüge 6-8 Wochen im Voraus, um Preise ab {{price}} zu erhalten.",
      upgrade: "Upgrade",
      upgradeMsg: "Business Class Upgrades ab {{price}} - 20% günstiger diese Woche.",
      baggage: "Gepäck",
      baggageMsg: "Zusatzgepäck {{price}} wenn während der Buchung gekauft.",
      specialOffer: "Sonderangebot",
      specialOfferMsg: "Colombo nach Mumbai: {{oldPrice}} → {{newPrice}}"
    },
    
    priceAlertsTitle: "🚨 Preisalarme",
    
    flightStatusTitle: "📊 Flugstatus",
    departure: "Abflug",
    arrival: "Ankunft",
    gate: "Gate",
    status: {
      onTime: "Pünktlich",
      delayed: "Verspätet",
      boarding: "Boarding",
      departed: "Abgeflogen"
    },
    
    aiTravelAssistant: "KI-Reiseassistent (Sprachaktiviert)",
    chatPlaceholder: "Fragen Sie nach Flügen, Preisen oder Empfehlungen...",
    closeChat: "Chat schließen",
    
    aiResponses: {
      booking: "Sie können einfach Buchungen erstellen oder aktualisieren im 'Buchungen' Tab. Soll ich Sie dorthin führen?",
      price: "Aktuell kostet Colombo nach Mumbai ungefähr {{price}}. Wir haben auch bis zu 15% Rabatt für Frühbucher!",
      status: "Ihre Flüge sind heute größtenteils pünktlich ✈️. Die nächsten Abflüge von Colombo sind um 10:15 Uhr und 16:20 Uhr.",
      weather: "Das Wetter in Colombo ist sonnig ☀️, etwa 30°C. Perfekt zum Fliegen!",
      baggage: "Sie können 30 kg aufgegebenes Gepäck und 7 kg Handgepäck mitnehmen. Vergessen Sie nicht, online 24 Stunden vor Abflug einzuchecken!",
      time: "Die meisten Flüge verlassen Colombo täglich zwischen 8:00 Uhr und 22:00 Uhr. Welche Route möchten Sie prüfen?",
      route: "Flüge zwischen Colombo und Ihrem Zielort operieren täglich. Der Durchschnittspreis liegt bei etwa {{price}}.",
      greeting: "Hallo 👋! Ich bin Ihr KI-Reiseassistent. Sie können mich nach Buchungen, Preisen, Gepäck oder Flugstatus fragen.",
      payment: "Sie können mit Visa, MasterCard oder Online-Banking bezahlen. Rückerstattungen werden innerhalb von 3-5 Werktagen nach Stornierung bearbeitet.",
      advice: "Reisetipp 🌍: Buchungen 6-8 Wochen im Voraus geben usually den niedrigsten Preis. Auch Dienstage und Mittwoche haben tendenziell günstigere Flüge!",
      fallback: "Das habe ich nicht ganz verstanden — könnten Sie das bitte umformulieren?"
    }
  },
  
  ja: {
    // Japanese
    title: "✈️ AI搭載フライト予約システム",
    dashboard: "ダッシュボード",
    bookings: "予約",
    priceAlerts: "価格アラート",
    flightStatus: "フライト状況",
    darkMode: "ダークモード",
    live: "ライブ",
    refresh: "リアルタイムデータを更新",
    aiAssistant: "AIアシスタント",
    
    realTimeUpdates: "リアルタイム更新",
    updates: {
      baggagePromo: "追加手荷物プロモーション: 今週25%オフ",
      securityMeasures: "主要空港で新しいセキュリティ対策を実施",
      lastMinuteDeals: "週末フライトのラストミニット割引あり",
      loyaltyBonus: "ロイヤルティポイントボーナス: 今月の全予約でポイント2倍",
      weatherAlert: "北東地域のフライトに影響する可能性のある天気警報"
    },
    
    popularRoutes: "🌍 人気ルート",
    smartRecommendations: "スマートレコメンデーション",
    from: "から",
    
    recommendations: {
      bestTime: "ベストタイム",
      bestTimeMsg: "{{price}}からの運賃を解放するには6〜8週間前にフライトを予約してください。",
      upgrade: "アップグレード",
      upgradeMsg: "ビジネスクラスアップグレード: {{price}}から - 今週20%オフ。",
      baggage: "手荷物",
      baggageMsg: "予約時に購入すると追加手荷物{{price}}。",
      specialOffer: "特別オファー",
      specialOfferMsg: "コロンボ→ムンバイ: {{oldPrice}} → {{newPrice}}"
    },
    
    priceAlertsTitle: "🚨 価格アラート",
    
    flightStatusTitle: "📊 フライト状況",
    departure: "出発",
    arrival: "到着",
    gate: "ゲート",
    status: {
      onTime: "定刻",
      delayed: "遅延",
      boarding: "搭乗中",
      departed: "出発済み"
    },
    
    aiTravelAssistant: "AI旅行アシスタント（音声対応）",
    chatPlaceholder: "フライト、価格、おすすめについて質問...",
    closeChat: "チャットを閉じる",
    
    aiResponses: {
      booking: "'予約'タブで簡単に予約を作成または更新できます。案内しましょうか？",
      price: "現在、コロンボからムンバイまでの価格は約{{price}}です。早期予約で最大15%割引もあります！",
      status: "今日のフライトはほぼ定刻です✈️。コロンボからの次の出発は10:15と16:20です。",
      weather: "コロンボの天気は晴れ☀️、約30°Cです。飛行に最適です！",
      baggage: "預け荷物30kg、手荷物7kgまで持ち込めます。出発24時間前までのオンラインチェックインをお忘れなく！",
      time: "ほとんどのフライトは毎日8:00から22:00の間にコロンボを出発します。どのルートを確認しますか？",
      route: "コロンボと目的地間のフライトは毎日運航しています。平均価格は約{{price}}です。",
      greeting: "こんにちは👋！私はあなたのAI旅行アシスタントです。予約、価格、手荷物、フライト状況についてお聞きください。",
      payment: "Visa、MasterCard、またはオンラインバンキングでお支払いいただけます。返金はキャンセル後3〜5営業日以内に処理されます。",
      advice: "旅行のヒント🌍：6〜8週間前に予約すると通常最安値になります。また、火曜日と水曜日はより安いフライトがある傾向があります！",
      fallback: "よく理解できませんでした — 言い換えていただけますか？"
    }
  }
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [flightStatus, setFlightStatus] = useState({});
  const [openChat, setOpenChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  
  // 🌍 Language State
  const [language, setLanguage] = useState('en');
  const [languageAnchor, setLanguageAnchor] = useState(null);

  const t = translations[language];

  // ✅ Country → ISO code mapper for flagcdn.com
  const getCountryCode = (countryName) => {
    const codes = {
      "Sri Lanka": "lk",
      "India": "in",
      "United Arab Emirates": "ae",
      "Singapore": "sg",
      "Thailand": "th",
      "United States": "us",
      "Canada": "ca",
      "United Kingdom": "gb",
      "Germany": "de",
      "France": "fr",
      "Australia": "au",
      "Japan": "jp",
      "Brazil": "br",
      "South Africa": "za",
      "China": "cn",
      "Italy": "it",
      "Spain": "es",
      "Netherlands": "nl",
      "Sweden": "se"
    };
    return codes[countryName] || "xx"; // fallback
  };

  // ✅ Get flag URL from flagcdn
  const getCountryFlag = (countryName) => {
    const code = getCountryCode(countryName);
    return `https://flagcdn.com/w40/${code}.png`;
  };

  // USD to LKR conversion rate
  const USD_TO_LKR = 300;

  // Convert USD → LKR
  const convertToLKR = (usdAmount) => Math.round(usdAmount * USD_TO_LKR);

  // Format as currency
  const formatLKR = (amount) => `LKR ${amount.toLocaleString()}`;

  // Simulated data setup
  useEffect(() => {
    getBookings();
    generateRecommendations();
    setupRealTimeData();

    const interval = setInterval(() => {
      simulateRealTimeUpdates();
      checkFlightStatus();
      updatePriceAlerts();
    }, 5000);

    return () => clearInterval(interval);
  }, [language]);

  const getBookings = () => {
    Axios.get("http://localhost:3001/api/bookings")
      .then((res) => {
        setBooks(res.data?.response || []);
        setFilteredBooks(res.data?.response || []);
      })
      .catch((err) => console.error(err));
  };

  const addBooking = (data) => {
    setSubmitted(true);
    const maxId = books.length > 0 ? Math.max(...books.map((b) => b.id)) : 0;
    const newData = { ...data, id: maxId + 1 };
    Axios.post("http://localhost:3001/api/createbooking", newData)
      .then(() => {
        getBookings();
        setSubmitted(false);
        setIsEdit(false);
        setSelectedBooking({});
        addRealTimeUpdate(t.updates.baggagePromo);
      })
      .catch(() => setSubmitted(false));
  };

  const updateBooking = (data) => {
    setSubmitted(true);
    Axios.post("http://localhost:3001/api/updatebooking", data)
      .then(() => {
        getBookings();
        setSubmitted(false);
        setIsEdit(false);
        setSelectedBooking({});
        addRealTimeUpdate(`Booking #${data.id} ${language === 'en' ? 'updated successfully' : 
          language === 'es' ? 'actualizado exitosamente' :
          language === 'fr' ? 'mis à jour avec succès' :
          language === 'de' ? 'erfolgreich aktualisiert' : '正常に更新されました'}`);
      })
      .catch(() => setSubmitted(false));
  };

  const deleteBooking = (data) => {
    Axios.post("http://localhost:3001/api/deletebooking", data)
      .then(() => {
        getBookings();
        addRealTimeUpdate(`Booking #${data.id} ${language === 'en' ? 'deleted' : 
          language === 'es' ? 'eliminado' :
          language === 'fr' ? 'supprimé' :
          language === 'de' ? 'gelöscht' : '削除されました'}`);
      })
      .catch((err) => console.error(err));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) return setFilteredBooks(books);
    const filtered = books.filter(
      (b) =>
        b.from.toLowerCase().includes(term.toLowerCase()) ||
        b.to.toLowerCase().includes(term.toLowerCase()) ||
        b.id.toString().includes(term)
    );
    setFilteredBooks(filtered);
  };

  const setupRealTimeData = () => {
    setRealTimeUpdates([
      { id: 1, message: t.updates.baggagePromo, timestamp: new Date(), type: "price" },
      { id: 2, message: language === 'en' ? "New flight route added: Tokyo → Sydney" :
        language === 'es' ? "Nueva ruta de vuelo añadida: Tokio → Sídney" :
        language === 'fr' ? "Nouvelle route aérienne ajoutée: Tokyo → Sydney" :
        language === 'de' ? "Neue Flugroute hinzugefügt: Tokio → Sydney" :
        "新しいフライト路線追加: 東京→シドニー", timestamp: new Date(), type: "route" },
      { id: 3, message: language === 'en' ? "System updated with new features" :
        language === 'es' ? "Sistema actualizado con nuevas funciones" :
        language === 'fr' ? "Système mis à jour avec nouvelles fonctionnalités" :
        language === 'de' ? "System mit neuen Funktionen aktualisiert" :
        "新機能でシステム更新", timestamp: new Date(), type: "system" }
    ]);

    setPriceAlerts([
      { id: 1, route: "New York → London", oldPrice: convertToLKR(650), newPrice: convertToLKR(550), change: -15.4 },
      { id: 2, route: "Dubai → Singapore", oldPrice: convertToLKR(420), newPrice: convertToLKR(380), change: -9.5 },
      { id: 3, route: "Colombo → Mumbai", oldPrice: convertToLKR(601), newPrice: convertToLKR(526), change: -12.5 }
    ]);

    setFlightStatus({
      "New York → London": { status: t.status.onTime, departure: "08:30", arrival: "20:45", gate: "B12" },
      "Dubai → Singapore": { status: t.status.delayed, departure: "14:20", arrival: "22:10", gate: "C05" },
      "Colombo → Mumbai": { status: t.status.onTime, departure: "10:15", arrival: "11:45", gate: "A08" }
    });
  };

  const simulateRealTimeUpdates = () => {
    const updateTypes = ["price", "route", "system", "weather", "promotion"];
    const messages = [
      t.updates.lastMinuteDeals,
      t.updates.securityMeasures,
      t.updates.baggagePromo,
      t.updates.weatherAlert,
      t.updates.loyaltyBonus
    ];

    const newUpdate = {
      id: Date.now(),
      message: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date(),
      type: updateTypes[Math.floor(Math.random() * updateTypes.length)]
    };

    setRealTimeUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
  };

  const updatePriceAlerts = () => {
    const routes = [
      "London → Paris",
      "Tokyo → Seoul",
      "Sydney → Melbourne",
      "Berlin → Rome",
      "Colombo → Dubai",
      "Colombo → Singapore"
    ];
    const newRoute = routes[Math.floor(Math.random() * routes.length)];
    const change = (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 15);

    const basePriceUSD = 500 + Math.random() * 300;
    const oldPriceLKR = convertToLKR(basePriceUSD);
    const newPriceLKR = convertToLKR(basePriceUSD * (1 + change / 100));

    const newAlert = {
      id: Date.now(),
      route: newRoute,
      oldPrice: oldPriceLKR,
      newPrice: newPriceLKR,
      change: parseFloat(change.toFixed(1))
    };

    setPriceAlerts(prev => [newAlert, ...prev.slice(0, 3)]);
  };

  const checkFlightStatus = () => {
    const statuses = [t.status.onTime, t.status.delayed, t.status.boarding, t.status.departed];
    const routes = [
      "New York → London",
      "Dubai → Singapore",
      "Tokyo → Sydney",
      "Paris → Berlin",
      "Colombo → Mumbai",
      "Colombo → Male"
    ];

    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    setFlightStatus(prev => ({
      ...prev,
      [randomRoute]: {
        status: randomStatus,
        departure: "08:30",
        arrival: "20:45",
        gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(10 + Math.random() * 20)}`
      }
    }));
  };

  const addRealTimeUpdate = (message) => {
    const newUpdate = {
      id: Date.now(),
      message,
      timestamp: new Date(),
      type: "booking"
    };
    setRealTimeUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case t.status.onTime: return "success";
      case t.status.delayed: return "warning";
      case t.status.boarding: return "info";
      case t.status.departed: return "secondary";
      default: return "default";
    }
  };

  const generateRecommendations = () => {
    setRecommendations([
      {
        type: t.recommendations.bestTime,
        message: t.recommendations.bestTimeMsg.replace("{{price}}", formatLKR(convertToLKR(450))),
        icon: <AccessTimeIcon sx={{ fontSize: 32 }} color="info" />,
        color: "linear-gradient(135deg, #42a5f5, #1e88e5)",
      },
      {
        type: t.recommendations.upgrade,
        message: t.recommendations.upgradeMsg.replace("{{price}}", formatLKR(convertToLKR(1200))),
        icon: <UpgradeIcon sx={{ fontSize: 32 }} color="success" />,
        color: "linear-gradient(135deg, #66bb6a, #388e3c)",
      },
      {
        type: t.recommendations.baggage,
        message: t.recommendations.baggageMsg.replace("{{price}}", formatLKR(convertToLKR(50))),
        icon: <WorkIcon sx={{ fontSize: 32 }} color="secondary" />,
        color: "linear-gradient(135deg, #ab47bc, #7b1fa2)",
      },
      {
        type: t.recommendations.specialOffer,
        message: t.recommendations.specialOfferMsg
          .replace("{{oldPrice}}", formatLKR(convertToLKR(601)))
          .replace("{{newPrice}}", formatLKR(convertToLKR(526))),
        icon: <PriceCheckIcon sx={{ fontSize: 32 }} color="warning" />,
        color: "linear-gradient(135deg, #ffa726, #ef6c00)",
      },
    ]);
  };

  // ✅ Voice generation function
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
    // Set language based on selected language
    const langMap = {
      en: "en-US",
      es: "es-ES", 
      fr: "fr-FR",
      de: "de-DE",
      ja: "ja-JP"
    };
    
    utterance.lang = langMap[language] || "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ✅ Intelligent AI Assistant with multilingual support
  const sendChatMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const lower = message.toLowerCase().trim();
      let aiReply = "";

      // ✈️ Bookings-related
      if (
        lower.includes("book") || lower.includes("booking") || lower.includes("reserve") || lower.includes("ticket") ||
        lower.includes("reserva") || lower.includes("billete") || // Spanish
        lower.includes("réserver") || lower.includes("billet") || // French
        lower.includes("buchen") || lower.includes("buchung") || // German
        lower.includes("予約") || lower.includes("チケット") // Japanese
      ) {
        aiReply = t.aiResponses.booking;
      }

      // 💸 Price / discount queries
      else if (
        lower.includes("price") || lower.includes("cost") || lower.includes("fare") || lower.includes("discount") || 
        lower.includes("offer") || lower.includes("promotion") ||
        lower.includes("precio") || lower.includes("costo") || // Spanish
        lower.includes("prix") || lower.includes("coût") || // French
        lower.includes("preis") || lower.includes("kosten") || // German
        lower.includes("価格") || lower.includes("割引") // Japanese
      ) {
        aiReply = t.aiResponses.price.replace("{{price}}", formatLKR(convertToLKR(526)));
      }

      // 🕒 Flight status or schedule
      else if (
        lower.includes("status") || lower.includes("delay") || lower.includes("on time") || 
        lower.includes("depart") || lower.includes("arrival") || lower.includes("gate") || lower.includes("flight") ||
        lower.includes("estado") || lower.includes("vuelo") || // Spanish
        lower.includes("statut") || lower.includes("vol") || // French
        lower.includes("flug") || lower.includes("status") || // German
        lower.includes("状況") || lower.includes("フライト") // Japanese
      ) {
        aiReply = t.aiResponses.status;
      }

      // 🌦️ Weather
      else if (
        lower.includes("weather") || lower.includes("temperature") ||
        lower.includes("clima") || // Spanish
        lower.includes("météo") || // French
        lower.includes("wetter") || // German
        lower.includes("天気") // Japanese
      ) {
        aiReply = t.aiResponses.weather;
      }

      // 🧳 Baggage or check-in
      else if (
        lower.includes("bag") || lower.includes("check") || lower.includes("weight") || lower.includes("allowance") ||
        lower.includes("equipaje") || // Spanish
        lower.includes("bagage") || // French
        lower.includes("gepäck") || // German
        lower.includes("手荷物") // Japanese
      ) {
        aiReply = t.aiResponses.baggage;
      }

      // 🕰️ Time-related questions
      else if (
        lower.includes("time") || lower.includes("when") ||
        lower.includes("hora") || // Spanish
        lower.includes("heure") || // French
        lower.includes("uhrzeit") || // German
        lower.includes("時間") // Japanese
      ) {
        aiReply = t.aiResponses.time;
      }

      // 🛫 Route-related
      else if (
        lower.includes("colombo") || lower.includes("dubai") || lower.includes("mumbai") || lower.includes("singapore") ||
        lower.includes("ruta") || // Spanish
        lower.includes("route") || // French
        lower.includes("route") || // German
        lower.includes("ルート") // Japanese
      ) {
        aiReply = t.aiResponses.route.replace("{{price}}", formatLKR(convertToLKR(650)));
      }

      // 🌍 General greetings or help
      else if (
        lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || lower.includes("help") ||
        lower.includes("hola") || // Spanish
        lower.includes("bonjour") || // French
        lower.includes("hallo") || // German
        lower.includes("こんにちは") // Japanese
      ) {
        aiReply = t.aiResponses.greeting;
      }

      // 💳 Payment or refund
      else if (
        lower.includes("pay") || lower.includes("payment") || lower.includes("refund") || lower.includes("cancel") ||
        lower.includes("pago") || // Spanish
        lower.includes("paiement") || // French
        lower.includes("zahlung") || // German
        lower.includes("支払い") // Japanese
      ) {
        aiReply = t.aiResponses.payment;
      }

      // 💡 Travel advice
      else if (
        lower.includes("tip") || lower.includes("advice") || lower.includes("suggest") || lower.includes("recommend") ||
        lower.includes("consejo") || // Spanish
        lower.includes("conseil") || // French
        lower.includes("tipp") || // German
        lower.includes("アドバイス") // Japanese
      ) {
        aiReply = t.aiResponses.advice;
      }

      // ❤️ Fallback
      else {
        aiReply = t.aiResponses.fallback;
      }

      const aiMessage = {
        id: Date.now() + 1,
        text: aiReply,
        sender: "ai",
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, aiMessage]);

      // 🔊 Speak it aloud
      speakText(aiReply);
    }, 1000);
  };

  // Language selection handler
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setLanguageAnchor(null);
    // Refresh data with new language
    generateRecommendations();
    setupRealTimeData();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <Header />

      <Box
        sx={{
          width: '95%',
          margin: "20px auto",
          padding: "20px",
          borderRadius: 3,
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        }}
      >
        {/* Title + Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {t.title}
            </Typography>
            <Chip
              icon={<LiveTvIcon />}
              label={t.live}
              color="error"
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Language Selector */}
            <Tooltip title="Select Language">
              <IconButton 
                onClick={(e) => setLanguageAnchor(e.currentTarget)}
                sx={{ 
                  border: '1px solid', 
                  borderColor: 'divider',
                  bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                }}
              >
                <LanguageIcon />
                <Typography variant="body2" sx={{ ml: 1, textTransform: 'uppercase' }}>
                  {language}
                </Typography>
              </IconButton>
            </Tooltip>

            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              }
              label={t.darkMode}
            />
            <Tooltip title={t.refresh}>
              <IconButton onClick={() => {
                setupRealTimeData();
              }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t.aiAssistant}>
              <IconButton onClick={() => setOpenChat(true)}>
                <ChatIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Language Menu */}
        <Menu
          anchorEl={languageAnchor}
          open={Boolean(languageAnchor)}
          onClose={() => setLanguageAnchor(null)}
        >
          <MenuItem onClick={() => handleLanguageChange('en')}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src="https://flagcdn.com/w20/gb.png" sx={{ width: 20, height: 20 }} />
              English
            </Box>
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange('es')}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src="https://flagcdn.com/w20/es.png" sx={{ width: 20, height: 20 }} />
              Español
            </Box>
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange('fr')}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src="https://flagcdn.com/w20/fr.png" sx={{ width: 20, height: 20 }} />
              Français
            </Box>
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange('de')}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src="https://flagcdn.com/w20/de.png" sx={{ width: 20, height: 20 }} />
              Deutsch
            </Box>
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange('ja')}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src="https://flagcdn.com/w20/jp.png" sx={{ width: 20, height: 20 }} />
              日本語
            </Box>
          </MenuItem>
        </Menu>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label={t.dashboard} />
          <Tab label={t.bookings} />
          <Tab label={t.priceAlerts} />
          <Tab label={t.flightStatus} />
        </Tabs>

        {activeTab === 0 && (
          <>
            {/* Real-Time Updates */}
            <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <NotificationsActiveIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" fontWeight="600">
                  {t.realTimeUpdates}
                </Typography>
                <Chip label={t.live} size="small" color="error" sx={{ ml: 2 }} />
              </Box>
              <List>
                {realTimeUpdates.map((update) => (
                  <ListItem key={update.id}>
                    <ListItemIcon>
                      {update.type === 'price' && <TrendingUpIcon color="success" />}
                      {update.type === 'route' && <FlightIcon color="info" />}
                      {update.type === 'system' && <UpgradeIcon color="warning" />}
                      {update.type === 'booking' && <PriceCheckIcon color="primary" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={update.message}
                      secondary={new Date(update.timestamp).toLocaleTimeString()}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Popular Routes */}
            <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                {t.popularRoutes}
              </Typography>
              <Grid container spacing={2}>
                {[
                  { from: "Sri Lanka", to: "India", price: convertToLKR(526) },
                  { from: "Canada", to: "United Arab Emirates", price: convertToLKR(850) },
                  { from: "United States", to: "Singapore", price: convertToLKR(720) },
                  { from: "Germany", to: "Thailand", price: convertToLKR(650) }
                ].map((route, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                          <Avatar src={getCountryFlag(route.from)} sx={{ width: 32, height: 32, mr: 1 }} />
                          <FlightIcon sx={{ mx: 1 }} />
                          <Avatar src={getCountryFlag(route.to)} sx={{ width: 32, height: 32, ml: 1 }} />
                        </Box>
                        <Typography variant="body2" fontWeight="500">
                          {route.from} → {route.to}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t.from} {formatLKR(route.price)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* AI Recommendations Section */}
            <Paper
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 3,
                bgcolor: darkMode ? "#2a2a2a" : "#e8f4fd",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <InsightsIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" fontWeight="600">
                  {t.smartRecommendations}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {recommendations.map((rec, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        height: "100%",
                        background: rec.color,
                        color: "#fff",
                      }}
                    >
                      <Box sx={{ mb: 1 }}>{rec.icon}</Box>
                      <Typography variant="subtitle1" fontWeight="700">
                        {rec.type}
                      </Typography>
                      <Typography variant="body2">{rec.message}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>

          </>
        )}

        {activeTab === 1 && (
          <>
            <Divider sx={{ mb: 3 }} />
            <BookForm
              addBooking={addBooking}
              updateBooking={updateBooking}
              submitted={submitted}
              data={selectedBooking}
              isEdit={isEdit}
              darkMode={darkMode}
              bookings={books}
              language={language}
              translations={translations}
            />
            <BooksTable
              rows={filteredBooks}
              selectedBooking={(data) => {
                setSelectedBooking(data);
                setIsEdit(true);
              }}
              deleteBooking={deleteBooking}
              darkMode={darkMode}
              language={language}
              translations={translations}
            />
          </>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t.priceAlertsTitle}
            </Typography>
            <List>
              {priceAlerts.map((alert) => {
                const [from, to] = alert.route.split('→').map(s => s.trim());
                return (
                  <ListItem key={alert.id}>
                    <ListItemAvatar>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={getCountryFlag(from)} sx={{ width: 24, height: 24, mr: 1 }} />
                        <FlightTakeoffIcon fontSize="small" />
                        <Avatar src={getCountryFlag(to)} sx={{ width: 24, height: 24, ml: 1 }} />
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary={alert.route}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="body2"
                            color={alert.change < 0 ? "success.main" : "error.main"}
                          >
                            {alert.change < 0 ? '↓' : '↑'} {Math.abs(alert.change)}%
                          </Typography>
                          <Typography variant="body2">
                            {formatLKR(alert.oldPrice)} → {formatLKR(alert.newPrice)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        )}

        {activeTab === 3 && (
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t.flightStatusTitle}
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(flightStatus).map(([route, status]) => {
                const [from, to] = route.split('→').map(s => s.trim());
                return (
                  <Grid item xs={12} sm={6} key={route}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar src={getCountryFlag(from)} sx={{ width: 24, height: 24, mr: 1 }} />
                          <FlightTakeoffIcon fontSize="small" />
                          <Typography variant="body2" sx={{ ml: 1, mr: 2 }}>{from}</Typography>
                          <FlightLandIcon fontSize="small" />
                          <Avatar src={getCountryFlag(to)} sx={{ width: 24, height: 24, ml: 1, mr: 1 }} />
                          <Typography variant="body2">{to}</Typography>
                        </Box>
                        <Chip
                          label={status.status}
                          color={getStatusColor(status.status)}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2">{t.departure}: {status.departure}</Typography>
                        <Typography variant="body2">{t.arrival}: {status.arrival}</Typography>
                        <Typography variant="body2">{t.gate}: {status.gate}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        )}

        {/* AI Chat Dialog */}
        <Dialog open={openChat} onClose={() => setOpenChat(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <ChatIcon />
              </Avatar>
              <Typography variant="h6">{t.aiTravelAssistant}</Typography>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ height: "320px", overflowY: "auto", p: 2 }}>
            <List>
              {chatMessages.map((msg) => (
                <ListItem key={msg.id} disablePadding sx={{ mb: 1 }}>
                  <Card
                    sx={{
                      bgcolor: msg.sender === "ai" ? "primary.main" : "grey.200",
                      color: msg.sender === "ai" ? "#fff" : "#000",
                      ml: msg.sender === "user" ? "auto" : 0,
                      maxWidth: "80%",
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{ py: 1, px: 2 }}>
                      <Typography variant="body2">{msg.text}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </DialogContent>

          <DialogActions>
            <TextField
              placeholder={t.chatPlaceholder}
              fullWidth
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  sendChatMessage(e.target.value.trim());
                  e.target.value = "";
                }
              }}
            />
            <Tooltip title={t.closeChat}>
              <IconButton color="error" onClick={() => setOpenChat(false)}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </DialogActions>
        </Dialog>

      </Box>
    </Box>
  );
};

export default Books;