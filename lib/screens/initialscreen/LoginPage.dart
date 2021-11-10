// ignore_for_file: file_names

import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  @override
  State<LoginPage> createState() => LoginPageState();
}

class LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    var screen;
    return screen;
  }
}

Widget LoginBox(double posY) {
  return AnimatedContainer(
    duration: Duration(milliseconds: 1000),
    curve: Curves.fastLinearToSlowEaseIn,
    color: Colors.white,
    transform: Matrix4.translationValues(0, posY, 1),
  );
}

Widget LoginBox2(double posY) {
  return Stack(
    children: [
      AnimatedContainer(
        duration: Duration(milliseconds: 1000),
        curve: Curves.fastLinearToSlowEaseIn,
        color: Colors.black,
        transform: Matrix4.translationValues(0, posY, 1),
        child: Container(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                obscureText: true,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Username',
                  hintText: 'Enter Username',
                ),
              ),
            ],
          ),
        ),
      ),
      /*Container(
        child: Column(
          children: [
            TextField(
              obscureText: true,
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Username',
                hintText: 'Enter Username',
              ),
            ),
          ],
        ),
      )*/
    ],
  );
}
