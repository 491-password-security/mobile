// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'LoginPage.dart';

import 'package:mobile/route.dart' as route;

class InitialPage extends StatefulWidget {
  @override
  State<InitialPage> createState() => initialPageState();
}

class initialPageState extends State<InitialPage> {
  int state = 0;
  double windowHeight = 0;
  double windowWidth = 0;
  double posY = 0;

  @override
  Widget build(BuildContext context) {
    var screen;
    windowHeight = MediaQuery.of(context).size.height;
    windowWidth = MediaQuery.of(context).size.width;
    switch (state) {
      case 0:
        posY = windowHeight;
        break;
      case 1:
        posY = 500;
    }

    screen = FirstScreen(context);
    return screen;
  }

  Widget FirstScreen(BuildContext context) {
    return Stack(
      children: [
        Column(
          children: [
            Container(
              alignment: Alignment.topCenter,
              child: Logo(),
            ),
            Container(
              alignment: Alignment(0, 100),
              child: InitialButtons(),
            ),
          ],
        ),
        LoginBox(posY),
      ],
    );
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

  Widget InitialButtons() {
    return Column(
      children: [
        const SizedBox(height: 30),
        ClipRRect(
          borderRadius: BorderRadius.circular(15),
          child: CreateButton("Login", 1),
        ),
        const SizedBox(height: 30),
        ClipRRect(
          borderRadius: BorderRadius.circular(15),
          child: CreateButton("Register", 2),
        ),
        const SizedBox(height: 30),
          ClipRRect(
            borderRadius: BorderRadius.circular(15),
            child: TextButton(
              style: TextButton.styleFrom(
              padding: const EdgeInsets.all(16.0),
              primary: Colors.white,
                textStyle: const TextStyle(fontSize: 20),
              ),
              onPressed: () => Navigator.pushNamed(context, 'HomePage'),
              child: Text('goto home'),),
        ),
      ],
    );
  }

  Widget CreateButton(String buttonName, int i) {
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
          onPressed: () => {
            setState(() {
              state = i;
            }),
          },
          child: Text(buttonName),
        ),
      ],
    );
  }
}
