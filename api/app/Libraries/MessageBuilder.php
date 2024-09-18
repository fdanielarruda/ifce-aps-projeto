<?php

namespace App\Libraries;

class MessageBuilder
{
    private $messages = [];

    public function addMessage($role, $content)
    {
        $this->messages[] = [
            "role" => $role,
            "content" => $content
        ];

        return $this;
    }

    public function getMessages()
    {
        return $this->messages;
    }
}
