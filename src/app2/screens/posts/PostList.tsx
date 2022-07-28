import React, { memo, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useAppSelector } from '@/app2/app/store';
import { postSelectors } from '@/app2/screens/posts/redux';
import { userSelectors } from '@/app2/screens/users/redux';
import Empty from '@/app2/components/Empty';

interface ItemProps {
  postId: string;
}

const Item = memo(({ postId }: ItemProps) => {
  const selectPost = useMemo(() => postSelectors.makeSelectPost(), []);
  const post = useAppSelector(selectPost(postId));

  const selectUser = useMemo(() => userSelectors.makeSelectUser(), []);
  const user = useAppSelector(selectUser(post.userId));

  const [isSelected, setIsSelected] = useState(false);

  const onSelect = () => {
    setIsSelected(!isSelected);
  };

  // console.log('Post');
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
});

const PostList = () => {
  const postIds = useAppSelector(postSelectors.postIds);

  if (!postIds.length) {
    return <Empty text="No Posts" />;
  }

  console.log('PostList', postIds.length);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={postIds}
        renderItem={({ item }) => <Item postId={item} />}
        keyExtractor={(item) => item}
        //
      />
    </SafeAreaView>
  );
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

export default PostList;
