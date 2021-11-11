// ignore_for_file: file_names

import 'package:flutter/material.dart';

class SimpleDesign extends StatefulWidget {
  @override
  State<SimpleDesign> createState() => SimpleDesignState();
}

class SimpleDesignState extends State<SimpleDesign> {
  @override
  Widget build(BuildContext context) {
    var screen = FirstScreen();
    return screen;
  }
}

Widget FirstScreen() {
  return Material(
      color: Colors.black,
      child: Stack(
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Logo(),
              SizedBox(height: 150),
              LoginAndRegisterFields("Username", false),
              LoginAndRegisterFields("Password", true),
              SizedBox(height: 40),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  InitialButton("Login"),
                  InitialButton("Register"),
                ],
              )
            ],
          ),
        ],
      ));
}

Widget Logo() {
  return Column(
    children: [
      Image.asset('assets/images/lock.png', width: 250, height: 250),
      const Text("Password Security",
          style: TextStyle(
              fontSize: 25,
              fontStyle: FontStyle.normal,
              color: Colors.white,
              decoration: TextDecoration.none))
    ],
  );
}

Widget InitialButton(String name) {
  return Stack(
    children: [
      const SizedBox(height: 30),
      ClipRRect(
        borderRadius: BorderRadius.circular(15),
        child: CreateButton(name),
      ),
    ],
  );
}

Widget CreateButton(String buttonName) {
  return Stack(
    children: <Widget>[
      Positioned.fill(
        child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: <Color>[
                Color(0xFF212121),
                Color(0xFF303030),
              ],
            ),
          ),
        ),
      ),
      TextButton(
        style: TextButton.styleFrom(
          padding: const EdgeInsets.all(16.0),
          primary: Colors.white,
          textStyle: const TextStyle(fontSize: 20),
        ),
        onPressed: () => {},
        child: Text(buttonName),
      ),
    ],
  );
}

Widget LoginAndRegisterFields(String tmp, bool tmp2) {
  return Flexible(
    child: TextField(
      obscureText: tmp2,
      decoration: InputDecoration(
        //fillColor: Colors.white
        fillColor: Colors.grey, filled: true,
        border: OutlineInputBorder(),
        labelText: tmp,
        hintText: tmp,
      ),
    ),
  );
}
