import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { Post, AppState } from 'app1/types';
import { selectPosts, selectUser } from 'app1/store/selectors';
import Empty from 'app1/components/empty';

interface ItemProps {
  post: Post;
}

const Item = (props: ItemProps) => {
  // console.log('Post');
  const { post } = props;
  const user = useSelector((state: AppState) => selectUser(state, post.userId));
  const [isSelected, setIsSelected] = useState(false);

  const onSelect = () => {
    setIsSelected(!isSelected);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onSelect}>
        <Text style={styles.name}>{post.title}</Text>
      </TouchableOpacity>
      {isSelected && (
        <View style={styles.details}>
          <Text>{user.name + '\n' + post.body}</Text>
        </View>
      )}
    </View>
  );
};

const List: NavigationStackScreenComponent = () => {
  const posts = useSelector(selectPosts);
  console.log('PostList', posts.length);

  if (!posts.length) {
    return <Empty text="No Posts" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Item post={item} />}
        keyExtractor={item => `${item.id}`}
      />
    </SafeAreaView>
  );
};

List.navigationOptions = {
  title: 'Posts',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    padding: 10,
  },
  name: {
    fontSize: 16,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },
});

export default List;
