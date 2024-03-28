import { View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BusinessRegisterButton = () => {
  const navigation = useNavigation();

  const handleBusinessRegisterPress = async () => {
    navigation.navigate('business-register/index')
  };

  return (
    <View style={{ margin: 10 }}>
      <Button title="Register new business" onPress={handleBusinessRegisterPress} />
    </View>
  );
};

export default BusinessRegisterButton;