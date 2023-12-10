import React from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

const ListPatients = ({ navigationProps, allPatients }) => {
	const renderItem = data => (
		<TouchableOpacity
			onPress={() =>
				navigationProps.navigation.navigate('ViewPatient', {
					patient: data.item,
				})
			}
			style={styles.wrapper}
		>
			<Text>
				{data?.item?.name} (
				{data?.item?.condition})
			</Text>
		</TouchableOpacity>
	);

	return (
		<View>
			<FlatList
				data={allPatients}
				renderItem={patient => renderItem(patient)}
				keyExtractor={patient => patient._id}
			/>
		</View>
	);
};

export default ListPatients;

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		borderWidth: 1,
        marginVertical: 20,
        paddingVertical: 10
	},
});
