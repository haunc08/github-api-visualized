import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { get } from 'lodash';
import Heading from './Heading';
import Pagination from './Pagination';
import Loading from './Loading';

function ListItem({ selected, className, ...rest }) {
  return (
    <li
      className={classNames(
        { 'bg-blue-50': selected },
        'py-4 px-4 border-t group',
        className
      )}
      {...rest}
    />
  );
}

function List({ header, containerClassName, ...rest }) {
  return (
    <div className={classNames('flex flex-col', containerClassName)}>
      <Heading className="ml-4">{header}</Heading>
      <ul {...rest} />
    </div>
  );
}

function BasicList({
  header,
  containerClassName,
  className,
  listItemClassName,
  data = [],
  keyField,
  renderItem = (item, index, selected) => item,
  loading,
  loadingComponent = <Loading />,
  loadingItemCount = 1,
  onClick,
  selectable,
  clickable,
}) {
  const [selectedKey, setSelectedKey] = useState(null);

  function handleClickItem(e, key, item) {
    if (selectable) {
      setSelectedKey(key);
    }
    if (typeof onClick === 'function') onClick(e, item);
  }

  return (
    <List
      header={header}
      containerClassName={containerClassName}
      className={className}
    >
      {data.map((item, index) => {
        const key = get(item, keyField, index);
        const selected = key === selectedKey;
        return (
          <ListItem
            key={key}
            className={classNames(
              {
                'cursor-pointer hover:bg-gray-50':
                  typeof onClick === 'function' || selectable || clickable,
                'hover:bg-blue-50': selected,
              },
              listItemClassName
            )}
            onClick={(e) => handleClickItem(e, key, item)}
            selected={selected}
          >
            {renderItem(item, index, selected)}
          </ListItem>
        );
      })}
      {!!loading &&
        Array.from({ length: loadingItemCount }, (_, i) => (
          <ListItem key={'loading-' + i} className={listItemClassName}>
            {loadingComponent}
          </ListItem>
        ))}
    </List>
  );
}

function InfiniteList({
  data,
  loading,
  renderItem = (item, index, selected) => {},
  onBottomReached = () => {},
  ...basicListProps
}) {
  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onBottomReached();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, onBottomReached]
  );

  return (
    <BasicList
      data={loading ? data.concat([]) : data}
      renderItem={(item, index, selected) => (
        <div ref={index + 1 === data.length ? lastItemRef : undefined}>
          {renderItem(item, index, selected)}
        </div>
      )}
      loading={loading}
      {...basicListProps}
    />
  );
}

function PaginationList({ containerClassName, ...basicListProps }) {
  return (
    <div className={classNames('flex flex-col gap-6', containerClassName)}>
      <BasicList {...basicListProps} />
      <Pagination className="self-center" total={50} />
    </div>
  );
}

const Lists = {
  ListItem,
  List,
  BasicList,
  InfiniteList,
  PaginationList,
};

export default Lists;
