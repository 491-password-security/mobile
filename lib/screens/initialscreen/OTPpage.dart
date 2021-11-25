// ignore_for_file: file_names

import 'dart:convert';

import 'package:flutter/material.dart';
import 'dart:async';

import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:hive/hive.dart';
import 'package:hive_flutter/hive_flutter.dart';

class OTPpage extends StatefulWidget {
  @override
  State<OTPpage> createState() => OTPpageState();
}

class OTPpageState extends State<OTPpage> {
  int state = 0;
  double windowHeight = 0;
  double windowWidth = 0;
  double posY = 0;
  double posYRegister = 0;

  final emailController = TextEditingController();
  final otpController = TextEditingController();
  final passwordController = TextEditingController();
  //late TextEditingController nullController;

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    emailController.dispose();
    super.dispose();
  }

  String baseUrl = "http://46.101.218.223:5000";

//endpoint = 'registration';
  void Register(String email) async {
    final response = await http.post(
      Uri.parse(baseUrl + "/registration"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': email,
      }),
    );
    if (response.statusCode == 200) {
    } else {
      print(response.statusCode);
      throw Exception('Failed ! ');
    }
  }

  void submitOTP(String email, String otpCode) async {
    var box = await Hive.openBox('data');
    final response = await http.post(
      Uri.parse(baseUrl + "/verify-otp"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': otpCode,
      }),
    );
    if (response.statusCode == 200) {
      String accessToken = jsonDecode(response.body)['data']['access_token'];
      String refreshToken = jsonDecode(response.body)['data']['refresh_token'];
      box.put('access_token', accessToken);
      box.put('refresh_token', refreshToken);
      /*print(accessToken);
      print(box.get('access_token'));
      print(refreshToken);
      print(box.get('refresh_token'));
      */
      Navigator.pushReplacementNamed(context, "PasswordPage");
    } else {
      print(response.statusCode);
      throw Exception('Failed ! ');
    }
  }

  @override
  Widget build(BuildContext context) {
    var screen;
    windowHeight = MediaQuery.of(context).size.height;
    windowWidth = MediaQuery.of(context).size.width;
    switch (state) {
      case 0:
        posY = windowHeight;
        posYRegister = windowHeight;
        break;
      case 1:
        posY = 300;
        break;
      case 2:
        posYRegister = 300;
        break;
      case 4:
        posYRegister = windowHeight;
        posY = 300;
    }

    screen = FirstScreen(context);
    return screen;
  }

  Widget FirstScreen(BuildContext context) {
    return Material(
        color: Colors.black,
        child: Stack(
          children: [
            Container(
              decoration: BoxDecoration(
                image: DecorationImage(
                    image: AssetImage("assets/images/tt.png"),
                    fit: BoxFit.cover),
              ),
              child: Column(
                children: [
                  Container(
                    alignment: Alignment.topCenter,
                    child: Logo(),
                  ),
                  const SizedBox(height: 50),
                  LoginAndRegisterFields(
                      "Email", false, emailController), //email field
                  const SizedBox(height: 50),
                  CreateInitialButton("Login", 1),
                  CreateInitialButton("Register", 2),
                ],
              ),
            ),
            LoginBox(posY),
            RegisterBox(posYRegister),
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

  Widget CreateInitialButton(String name, int i) {
    return Column(
      children: [
        const SizedBox(height: 30),
        ClipRRect(
          borderRadius: BorderRadius.circular(15),
          child: CreateButtonHelper(name, i),
        ),
      ],
    );
  }

  Widget CreateButtonHelper(String buttonName, int i) {
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
              if (i == 1) {
                String inputMail = emailController.text;
                Register(inputMail);
                print(inputMail);
                state = i;
              } else if (i == 3) {
                String inputMail = emailController.text;
                String inputOTP = otpController.text;
                submitOTP(inputMail, inputOTP);
              } else if (i == 4) {
                //String inputRegisterMail = emailController.text;
                //String inputOTP = otpController.text;
                //submitOTP(inputMail, inputOTP);
                state = i;
              } else {
                state = i;
              }
            }),
          },
          child: Text(buttonName),
        ),
      ],
    );
  }

  Widget LoginBox(double posY) {
    return Stack(
      children: [
        AnimatedContainer(
          duration: Duration(milliseconds: 1000),
          curve: Curves.fastLinearToSlowEaseIn,
          //color: Colors.grey,
          transform: Matrix4.translationValues(0, posY, 1),
          decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.8),
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(15), topRight: Radius.circular(15))),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const SizedBox(height: 30),
              LoginAndRegisterFields(
                "OTP",
                true,
                otpController,
              ),
              const SizedBox(height: 20),
              //LoginAndRegisterFields("Password", false),
              const SizedBox(height: 30),
              Row(
                //mainAxisSize: MainAxisSize.min,
                //crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  CreateInitialButton("Submit", 3),
                  CreateInitialButton("Back", 0)
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget RegisterBox(double posY) {
    return Stack(
      children: [
        AnimatedContainer(
          duration: Duration(milliseconds: 1000),
          curve: Curves.fastLinearToSlowEaseIn,
          //color: Colors.grey,
          transform: Matrix4.translationValues(0, posY, 1),
          decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.8),
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(15), topRight: Radius.circular(15))),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              //const SizedBox(height: 30),
              //LoginAndRegisterFields("Email", true, TextEditingController()),
              const SizedBox(height: 30),
              LoginAndRegisterFields("Password", true, passwordController),
              //const SizedBox(height: 30),
              Row(
                //mainAxisSize: MainAxisSize.min,
                //crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  CreateInitialButton("Submit", 4),
                  CreateInitialButton("Back", 0)
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget LoginAndRegisterFields(
      String hintText, bool isObscure, TextEditingController controller) {
    return Flexible(
      child: TextField(
        controller: controller,
        obscureText: isObscure,
        decoration: InputDecoration(
          fillColor: Colors.blueGrey.withOpacity(0.9),
          filled: true,
          border: OutlineInputBorder(),
          hintText: hintText,
        ),
      ),
    );
  }
}
