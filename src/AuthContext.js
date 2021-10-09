import React from 'react';

export const UserContext = React.createContext({
  fullName: "Name Example",
  email: "Email@Example.com",
  whyJoin: "Why should you bee joined",
  elevatorPitch: "My elevator pitch",
  uid: "UIDEXAMPLE",
  powers: ["POWER1", "POWER2"],
  fields: ["FIELD1", "FIELD2"],
});