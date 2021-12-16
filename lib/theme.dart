import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'globals.dart' as globals;

final ThemeData lightTheme = ThemeData.light().copyWith(
  snackBarTheme: SnackBarThemeData(
    contentTextStyle: TextStyle(
      color: Colors.white,
    )
  )
);

final ThemeData darkTheme = ThemeData.dark().copyWith(
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ButtonStyle(
      backgroundColor: MaterialStateProperty.all(ThemeData.dark().primaryColor),
    )
  ),
  snackBarTheme: SnackBarThemeData(
    contentTextStyle: TextStyle(
      color: Colors.white,
    )
  ),
  bottomNavigationBarTheme: BottomNavigationBarThemeData(
    selectedItemColor: Colors.grey[100],
    backgroundColor: Colors.grey[900],
    unselectedItemColor: Colors.grey[700],
  )
  
);

extension customDarkTheme on ColorScheme{
  Color get itemBoxColor => (brightness == Brightness.light) ? Color.fromRGBO(240, 240, 240, 1) : Colors.grey[800]!;
  Color get snackBarColor => (brightness == Brightness.light) ? Colors.grey[400]! : Colors.grey[800]!; 
}

class ThemeChanger with ChangeNotifier{
  final window = WidgetsBinding.instance!.window;
  ThemeData _themeData;

  ThemeChanger(this._themeData){
    window.onPlatformBrightnessChanged = () {
     var brightness = window.platformBrightness; 
     setTheme((brightness == Brightness.light) ? lightTheme : darkTheme);
    };
  }

  getTheme() => _themeData;

  setTheme(ThemeData theme) =>{
    _themeData = theme,
    notifyListeners(),
  };
}

void setSystemTheme(BuildContext context, ThemeChanger _themeChanger) {
    final brightness = MediaQuery.of(context).platformBrightness;
    if(brightness == Brightness.dark){
      _themeChanger.setTheme(darkTheme);
    }else{
      _themeChanger.setTheme(lightTheme);
    }
}

ThemeData loadTheme(BuildContext context){
  var brightness = SchedulerBinding.instance!.window.platformBrightness;
  if(globals.preferencesStore.containsKey('theme')){
    String theme = globals.preferencesStore.get('theme');
    switch (theme) {
      case 'Dark':
        return darkTheme;
      case 'Light':
        return lightTheme;
      case 'System':
        return (brightness == Brightness.light) ? lightTheme : darkTheme;
      default:
        return darkTheme;
    }
  }else{
    return (brightness == Brightness.light) ? lightTheme : darkTheme ;
  }
}