import React from 'react'
import { shallow } from 'enzyme'

import {
  getHostname,
  voteArrow,
  getTitle,
  Title,
  Score,
  PostedBy,
  Discuss,
  Meta,
  Story
} from '../../client/containers/Story'

it("Story { type: 'story' } renders correctly", () => {
  const story = {
    id: 'story-id',
    type: 'story',
    title: 'Google',
    link: 'https://google.com',
    comments: [],
    votes: [],
    createdAt: new Date(0),
    createdBy: 'user-id',
    createdByName: 'user'
  }

  const wrapper = shallow(<Story story={story} loggedIn={true} voted={0} />)

  expect(wrapper).toMatchSnapshot()
})

it("Story { type: 'ask' } renders correctly", () => {
  const story = {
    id: 'story-id',
    type: 'ask',
    title: 'Ask HN: Google',
    text: 'Google',
    comments: [],
    votes: [],
    createdAt: new Date(0),
    createdBy: 'user-id',
    createdByName: 'user'
  }

  const wrapper = shallow(
    <Story story={story} loggedIn={true} voted={0} userId={'user-id'} />
  )

  expect(wrapper).toMatchSnapshot()
})

it("Story { type: 'ask' } renders correctly", () => {
  const story = {
    id: 'story-id',
    type: 'ask',
    title: 'Ask HN: Google',
    link: 'https://www.google.com',
    comments: [
      {
        id: 'comment-id',
        parentId: 'story-id',
        text: 'comment',
        createdAt: new Date(0),
        createdBy: 'user-id',
        createdByNane: 'user'
      }
    ],
    votes: [],
    createdAt: new Date(0),
    createdBy: 'user-id',
    createdByName: 'user'
  }

  const wrapper = shallow(
    <Story story={story} loggedIn={true} voted={0} userId={'user-id'} />
  )

  wrapper.find(Meta).shallow()

  expect(wrapper).toMatchSnapshot()
})

it('Story { commentCount: 1 } renders correctly', () => {
  const story = {
    id: 'story-id',
    type: 'ask',
    title: 'Ask HN: Google',
    link: 'https://www.google.com',
    commentCount: 1,
    votes: [],
    createdAt: new Date(0),
    createdBy: 'user-id',
    createdByName: 'user'
  }

  const markup = shallow(
    <Story story={story} loggedIn={true} voted={0} userId={'user-id'} />
  )
  expect(markup).toMatchSnapshot()
})

it('Meta renders correctly', () => {
  const markup = shallow(
    <Meta
      id={'story-id'}
      votes={['user-id']}
      commentCount={1}
      voted={true}
      loggedIn={true}
      createdAt={new Date(0)}
      createdBy={'user-id'}
      createdByName={'user'}
      commentCount={0}
    />
  )

  expect(markup).toMatchSnapshot()
})

it('Meta renders correctly', () => {
  const markup = shallow(
    <Meta
      id={'story-id'}
      commentCount={1}
      voted={true}
      loggedIn={true}
      createdAt={new Date(0)}
      commentCount={0}
    />
  )

  expect(markup).toMatchSnapshot()
})

it("Discuss { 'commentCount': 0 } renders correctly", () => {
  const markup = shallow(<Discuss id={'story-id'} commentCount={0} />)

  expect(markup).toMatchSnapshot()
})

it("Discuss { 'commentCount': 1 } renders correctly", () => {
  const markup = shallow(<Discuss id={'story-id'} commentCount={1} />)

  expect(markup).toMatchSnapshot()
})

it('PostedBy renders correctly', () => {
  const markup = shallow(<PostedBy id={'user-id'} name={'user'} />)

  expect(markup).toMatchSnapshot()
})

it("Score { 'score': 0 } renders correctly", () => {
  const markup = shallow(<Score score={0} />)

  expect(markup).toMatchSnapshot()
})

it("Score { 'score': 1 } renders correctly", () => {
  const markup = shallow(<Score score={1} />)

  expect(markup).toMatchSnapshot()
})

it('Title renders correctly', () => {
  const markup = shallow(
    <Title
      title={'Title'}
      link={'/story/story-id'}
      voted={true}
      loggedIn={true}
    />
  )

  expect(markup).toMatchSnapshot()
})

it('Title { external link } renders correctly', () => {
  const markup = shallow(
    <Title title={'Title'} link={'https://google.com'} loggedIn={true} />
  )

  expect(markup).toMatchSnapshot()
})

it('Title { external link with www } renders correctly', () => {
  const markup = shallow(
    <Title title={'Title'} link={'https://www.google.com'} loggedIn={true} />
  )

  expect(markup).toMatchSnapshot()
})

it('getHostname renders correctly', () => {
  const markup = shallow(<getHostname link={'http://www.google.com'} />)

  expect(markup).toMatchSnapshot()
})

it('upvoteStory', () => {
  const story = {
    id: 'story-id',
    type: 'story',
    title: 'Google',
    link: 'https://google.com',
    comments: [],
    votes: [],
    createdAt: new Date(0),
    createdBy: 'user-id',
    createdByName: 'user'
  }

  const wrapper = shallow(<Story story={story} loggedIn={true} voted={0} />)
  let upvoteStory = false
  wrapper.setProps({
    upvoteStory: () => (upvoteStory = true)
  })
  expect(upvoteStory).toEqual(false)
  wrapper
    .find(Title)
    .shallow()
    .find('.story__votearrow')
    .simulate('click')
  expect(upvoteStory).toEqual(true)
})

it('unvoteStory', () => {
  const story = {
    id: 'story-id',
    type: 'story',
    title: 'Google',
    link: 'https://google.com',
    comments: [],
    votes: [],
    createdAt: new Date(0),
    createdBy: 'user-id',
    createdByName: 'user'
  }

  const wrapper = shallow(<Story story={story} loggedIn={true} voted={1} />)
  let unvoteStory = false
  wrapper.setProps({
    unvoteStory: () => (unvoteStory = true)
  })
  expect(unvoteStory).toEqual(false)
  wrapper
    .find(Meta)
    .shallow()
    .find('.item__unvote')
    .simulate('click')
  expect(unvoteStory).toEqual(true)
})

it('Invalid story', () => {
  const wrapper = shallow(<Story loggedIn={true} voted={1} />)
  expect(wrapper.find('.story')).toHaveLength(0)
})