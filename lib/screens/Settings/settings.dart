import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart' as fa;

class SettingsPage extends StatefulWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  State<SettingsPage> createState() => SettingsPageState();
}

class SettingsPageState extends State<SettingsPage> {
  @override
  Widget build(BuildContext context) {
    Widget page = Scaffold(
      appBar: AppBar(
        toolbarHeight: 40,
        title: const Text("Settings"),
      ),
      body: Column(),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
              icon: fa.FaIcon(fa.FontAwesomeIcons.userSecret), label: "Vault"),
          BottomNavigationBarItem(
              icon: Icon(Icons.settings), label: "Settings"),
        ],
        currentIndex: 1,
        onTap: (index) => {
          if (index == 0) Navigator.pushReplacementNamed(context, "HomePage")
        },
      ),
    );
    return page;
  }
}
