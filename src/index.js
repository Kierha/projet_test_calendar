import MyCalendar from "calendar_service_web";

document.addEventListener("DOMContentLoaded", () => {
  const myCal = new MyCalendar("monCalendrier", {
    eventClass: "green-event", // utilisation de la classe CSS personnalisée
    events: {
      "2023-10-31": {
        // Vous pouvez changer la date, le titre ou la description pour tester avec des événements actuels
        title: "Halloween",
        description: "Une célébration festive",
      },
      "2023-10-11": {
        // Vous pouvez changer la date, le titre ou la description pour tester avec des événements actuels
        title: "Ydays",
        description: "Projet général",
      },
      "2023-10-18": {
        title: "Ydays",
        description: "Projet général",
      },
      "2023-10-25": {
        title: "Ydays",
        description: "Projet général",
      },
    },
  });
});
