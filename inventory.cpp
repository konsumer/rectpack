#include <vector>
#include <list>


struct Size2i
{
    int x = 0;
    int y = 0;
};

class Item
{
public:
    Size2i Size;
    int Id = 0;
};

class Inventory
{
protected:
    std::vector<Item*>   Items;
    std::vector<int>    BackpackContents;
    Size2i              BackpackSize;

    size_t GetBackpackIndex(int x, int y)
    {
        return y * BackpackSize.x + x;
    }

public:
    Inventory(const Size2i& backpackSize)
        : BackpackSize(backpackSize)
    {
        BackpackContents.resize(BackpackSize.x * BackpackSize.y);

        for (auto& i : BackpackContents)
            i = -1;
    }

    bool ItemCanFit(Size2i position, Item* item)
    {
        for (int y = position.y; y < position.y + item->Size.y; y++)
        {
            if (y >= BackpackSize.y)
                return false;

            for (int x = position.x; x < position.x + item->Size.x; x++)
            {
                if (x >= BackpackSize.x)
                    return false;

                size_t index = GetBackpackIndex(x, y);
                if (BackpackContents[index] != -1)
                    return false;
            }
        }

        return true;
    }

    bool InsertItem(Size2i position, Item* item)
    {
        if (!ItemCanFit(position, item))
            return false;

        for (int y = position.y; y < position.y + item->Size.y; y++)
        {
            for (int x = position.x; x < position.x + item->Size.x; x++)
            {
                size_t index = GetBackpackIndex(x, y);
                BackpackContents[index] = item->Id;
            }
        }
        Items.push_back(item);

        return true;
    }

    Item* RemoveItem(int id)
    {
        Item* item = nullptr;

        for (std::vector<Item*>::iterator itr = Items.begin(); itr != Items.end(); itr++)
        {
            if ((*itr)->Id == id)
            {
                item = *itr;
                Items.erase(itr);
                break;
            }
        }

        if (!item)
            return nullptr;

        for (auto& slot : BackpackContents)
        {
            if (slot == id)
                slot = -1;
        }

        return item;
    }

    Size2i FindAvailableSlot(Item* item)
    {
        for (int y = 0; y < BackpackSize.y; y++)
        {
            for (int x = 0; x < BackpackSize.x; x++)
            {
                Size2i pos = { x,y };
                if (ItemCanFit(pos, item))
                {
                    return pos;
                }
            }
        }

        return Size2i{ -1,-1 };
    }
};