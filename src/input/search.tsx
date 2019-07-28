import React, { useState } from 'react';
import Input from './input';
import Button from '../button';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (arg: string) => void;
  searchButton?: string | boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Search: React.FunctionComponent<SearchProps> = (props: SearchProps) => {
  const { onSearch, searchButton, value, onChange, ...rest } = props;
  const [inputValue, setInputValue] = useState<string>('');
  const searchNode =
    typeof searchButton === 'string' ? (
      <Button
        buttonType="primary"
        style={{
          margin: 0,
          marginLeft: '-1px',
          height: '100%',
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0
        }}
        onClick={() => {
          onSearch && onSearch(inputValue);
        }}
      >
        {searchButton}
      </Button>
    ) : searchButton ? (
      <Button
        buttonType="primary"
        icon="search"
        style={{
          margin: 0,
          marginLeft: '-1px',
          height: '100%',
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0
        }}
        onClick={() => {
          onSearch && onSearch(inputValue);
        }}
      />
    ) : null;

  const inputStyle = !!searchNode
    ? { borderBottomRightRadius: 0, borderTopRightRadius: 0 }
    : {};

  return (
    <Input
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.currentTarget.value);
      }}
      inputAfterNode={searchNode}
      style={{ ...inputStyle }}
      {...rest}
    />
  );
};

export default Search;
