import React, { memo, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Empty from '@src/app4/components/Empty';
import Loading from '@src/app4/components/Loading';
import { User } from '@src/app4/screens/users/types';
import { Post } from './types';
import * as api from './api';

interface ItemProps {
  post: Post;
  user: User | undefined;
}

const Item = memo(({ post, user }: ItemProps) => {
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
          <Text>{user?.name + '\n' + post.body}</Text>
        </View>
      )}
    </View>
  );
});

const PostList = () => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(['posts'], () => api.fetchPosts(1));

  const users = queryClient.getQueryData<User[]>(['users']);

  const getUser = (postId: string) => {
    const user = users?.find((u) => u.id === postId);
    return user;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Empty text="Something went wrong" />;
  }

  if (!data?.length) {
    return <Empty text="No Posts" />;
  }

  console.log('PostList', data.length);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item post={item} user={getUser(item.id)} />}
        keyExtractor={(item) => item.id}
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
